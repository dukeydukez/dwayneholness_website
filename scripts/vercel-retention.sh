#!/usr/bin/env bash
#
# vercel-retention.sh — prune old Vercel deployments by a retention rule.
#
# Deployment Storage on the Hobby tier is capped at 10 GB and every deployment
# keeps its build output forever. This removes the ones no longer earning space.
#
# The rule, in order of precedence:
#   1. Never touch a current rollback candidate           (live site protection)
#   2. aliasAssigned is deliberately NOT a protection: Vercel gives every
#      deployment its own *-hash.vercel.app permalink, so it is true for all
#      of them, including 4-day-old builds. It is also why `vercel remove
#      --safe` skips everything on this project and is useless here.
#   3. Never touch the KEEP_PROD newest production builds (instant rollback)
#   4. Delete remaining production builds older than PROD_DAYS
#   5. Delete preview builds older than PREVIEW_DAYS
#
# Dry run is the default. Nothing is deleted without --execute.
#
#   ./scripts/vercel-retention.sh                              # show the plan
#   ./scripts/vercel-retention.sh --keep-prod 10 --prod-days 3 --execute
#
# WHY THE REST API AND NOT THE CLI
# `vercel remove` resolves a user identity and fails with "User not found"
# against a team-scoped token (vcp_*), even though `vercel list` works with it.
# `vercel list --json` also returns no uid, only url. The REST API accepts the
# team token and returns uid, aliasAssigned and isRollbackCandidate, so the
# whole job runs against api.vercel.com. Do not port this back to the CLI.
#
set -euo pipefail

PROJECT="${PROJECT:-dwayneholness-website}"
KEEP_PROD="${KEEP_PROD:-10}"
PROD_DAYS="${PROD_DAYS:-30}"
PREVIEW_DAYS="${PREVIEW_DAYS:-14}"
EXECUTE=0

while [ $# -gt 0 ]; do
  case "$1" in
    --execute)      EXECUTE=1; shift ;;
    --project)      PROJECT="$2"; shift 2 ;;
    --keep-prod)    KEEP_PROD="$2"; shift 2 ;;
    --prod-days)    PROD_DAYS="$2"; shift 2 ;;
    --preview-days) PREVIEW_DAYS="$2"; shift 2 ;;
    -h|--help)      sed -n '2,26p' "$0"; exit 0 ;;
    *) echo "unknown option: $1" >&2; exit 2 ;;
  esac
done

ENV_FILE="${ENV_FILE:-$HOME/Corex-AI-System/09_Command_Center/.env}"
if [ -z "${VERCEL_TOKEN:-}" ] && [ -f "$ENV_FILE" ]; then
  VERCEL_TOKEN="$(grep -m1 -E '^VERCEL_TOKEN=' "$ENV_FILE" | cut -d= -f2- | tr -d "\"' \r\n")"
fi
[ -n "${VERCEL_TOKEN:-}" ] || { echo "VERCEL_TOKEN not set and not found in $ENV_FILE" >&2; exit 1; }
export VERCEL_TOKEN PROJECT KEEP_PROD PROD_DAYS PREVIEW_DAYS EXECUTE

python3 <<'PY'
import json, os, sys, time, urllib.request, urllib.error

TOKEN   = os.environ["VERCEL_TOKEN"]
PROJECT = os.environ["PROJECT"]
EXECUTE = os.environ["EXECUTE"] == "1"
API     = "https://api.vercel.com"

def call(method, path, tries=3):
    for attempt in range(tries):
        req = urllib.request.Request(API + path, method=method)
        req.add_header("Authorization", "Bearer " + TOKEN)
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                raw = r.read().decode()
                return r.status, (json.loads(raw) if raw.strip() else {})
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503) and attempt < tries - 1:
                time.sleep(2 * (attempt + 1)); continue
            return e.code, {"error": e.read().decode()[:200]}
        except Exception as e:
            if attempt < tries - 1:
                time.sleep(2); continue
            return 0, {"error": str(e)}

# Resolve team and project. Fail loudly rather than guess at ids.
st, data = call("GET", "/v9/projects?limit=100")
if st != 200:
    sys.exit(f"Cannot list projects (HTTP {st}). Check VERCEL_TOKEN. {data.get('error','')}")
proj = next((p for p in data.get("projects", []) if p.get("name") == PROJECT), None)
if not proj:
    names = ", ".join(p.get("name", "?") for p in data.get("projects", []))
    sys.exit(f"Project '{PROJECT}' not found. Available: {names}")
PID, TEAM = proj["id"], proj.get("accountId", "")
q = f"projectId={PID}" + (f"&teamId={TEAM}" if TEAM.startswith("team_") else "")

# Page backwards through history using the `until` cursor.
rows, seen, until = [], set(), None
for _ in range(60):
    path = f"/v6/deployments?{q}&limit=100" + (f"&until={until}" if until else "")
    st, data = call("GET", path)
    if st != 200:
        sys.exit(f"Deployment list failed (HTTP {st}). {data.get('error','')}")
    batch = data.get("deployments", [])
    if not batch:
        break
    for d in batch:
        uid, created = d.get("uid"), d.get("created") or d.get("createdAt")
        if not uid or not created:
            sys.exit("A deployment is missing uid/created. Aborting without deleting.")
        if uid in seen:
            continue
        seen.add(uid)
        rows.append({
            "uid": uid,
            "url": d.get("url", ""),
            "age": (time.time() - created / 1000.0) / 86400.0,
            "target": str(d.get("target") or "preview").lower(),
            "aliased": bool(d.get("aliasAssigned")),
            "rollback": bool(d.get("isRollbackCandidate")),
        })
    nxt = (data.get("pagination") or {}).get("next")
    if not nxt:
        break
    until = nxt

if not rows:
    sys.exit("No deployments returned.")

rows.sort(key=lambda r: r["age"])
keep_prod    = int(os.environ["KEEP_PROD"])
prod_days    = float(os.environ["PROD_DAYS"])
preview_days = float(os.environ["PREVIEW_DAYS"])

prod_seen, delete, protected = 0, [], 0
for r in rows:
    if r["rollback"]:
        protected += 1
        continue
    if r["target"] == "production":
        prod_seen += 1
        if prod_seen <= keep_prod or r["age"] <= prod_days:
            continue
        delete.append(r)
    elif r["age"] > preview_days:
        delete.append(r)

prod_total = sum(1 for r in rows if r["target"] == "production")
print(f"project={PROJECT}  keep_prod={keep_prod}  prod_days={prod_days:.0f}  "
      f"preview_days={preview_days:.0f}")
print("mode=" + ("EXECUTE" if EXECUTE else "DRY RUN"))
print(f"\n{len(rows)} deployments ({prod_total} production, {len(rows)-prod_total} preview)")
print(f"protected (rollback candidate): {protected}")
print(f"keep {len(rows)-len(delete)}, delete {len(delete)}\n")

if not delete:
    print("Nothing matches the retention rule. No action needed.")
    sys.exit(0)

print("WOULD DELETE" if not EXECUTE else "DELETING")
for r in delete[:40]:
    print(f"  {r['uid']}  {r['age']:>6.1f}d  {r['target']}")
if len(delete) > 40:
    print(f"  ... and {len(delete)-40} more")

if not EXECUTE:
    print("\nDry run. Re-run with --execute to carry this out.")
    sys.exit(0)

ok = fail = 0
for i, r in enumerate(delete, 1):
    tq = f"?teamId={TEAM}" if TEAM.startswith("team_") else ""
    st, data = call("DELETE", f"/v13/deployments/{r['uid']}{tq}")
    if st in (200, 202, 204):
        ok += 1
    else:
        fail += 1
        if fail <= 5:
            print(f"  FAILED {r['uid']} HTTP {st} {str(data.get('error',''))[:160]}")
    if i % 25 == 0:
        print(f"  ... {i}/{len(delete)} (removed={ok} failed={fail})")
    time.sleep(0.15)   # stay clear of rate limits

print(f"\nremoved={ok} failed={fail}")
PY
