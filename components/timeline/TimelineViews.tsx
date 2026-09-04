"use client";

import { useMemo, useState } from "react";
import { EVENTS, ERAS, LANES, type Lane, type TimelineEvent } from "@/lib/timeline-data";

function eraFor(year: number) {
  return ERAS.find((e) => year >= e.from && year <= e.to) ?? ERAS[ERAS.length - 1];
}

function when(e: TimelineEvent) {
  return e.date ? `${e.date} ${e.year}` : `${e.year}`;
}

/* ── Contact sheet ─────────────────────────────────────────────────────── */

export function IndexView({ onJump }: { onJump: (year: number) => void }) {
  const [only, setOnly] = useState<Set<Lane>>(new Set());

  const rows = useMemo(
    () => (only.size ? EVENTS.filter((e) => only.has(e.lane)) : EVENTS),
    [only]
  );

  const grouped = useMemo(() => {
    const m = new Map<number, TimelineEvent[]>();
    for (const e of rows) {
      const list = m.get(e.year) ?? [];
      list.push(e);
      m.set(e.year, list);
    }
    return [...m.entries()];
  }, [rows]);

  function toggle(l: Lane) {
    setOnly((prev) => {
      const next = new Set(prev);
      if (next.has(l)) next.delete(l);
      else next.add(l);
      return next;
    });
  }

  return (
    <section className="tl-index-wrap">
      <header className="tl-view-head">
        <p className="tl-eyebrow">Index</p>
        <h2>
          All of it, <em>listed</em>
        </h2>
        <p className="tl-view-lede">
          {rows.length} entries. Filter by lane, or click a line to open its year.
        </p>
        <div className="tl-filters">
          {(Object.keys(LANES) as Lane[]).map((l) => (
            <button
              type="button"
              key={l}
              className={`tl-chip${only.has(l) ? " is-on" : ""}`}
              onClick={() => toggle(l)}
              aria-pressed={only.has(l)}
            >
              {LANES[l].label}
            </button>
          ))}
          {only.size > 0 && (
            <button type="button" className="tl-chip tl-chip-clear" onClick={() => setOnly(new Set())}>
              Clear
            </button>
          )}
        </div>
      </header>

      <div className="tl-index">
        {grouped.map(([year, list]) => {
          const era = eraFor(year);
          return (
            <div className="tl-index-year" key={year} style={{ ["--era" as string]: era.hue }}>
              <div className="tl-index-y">
                <span>{year}</span>
                <span className="tl-index-n">{list.length}</span>
              </div>
              <ul>
                {list.map((e) => (
                  <li key={`${e.year}-${e.title}`}>
                    <button type="button" className={`tl-row lane-${e.lane}`} onClick={() => onJump(e.year)}>
                      <span className="tl-row-date">{e.date ?? ""}</span>
                      <span className="tl-row-title">{e.title}</span>
                      {e.tag && <span className="tl-row-tag">{e.tag}</span>}
                      {e.plate && <span className="tl-row-dot" aria-label="has a photograph">●</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}


/* ── Map ───────────────────────────────────────────────────────────────────
   An equirectangular plot cropped to the bounds of the record, drawn as a
   navigator's chart rather than a decorative world map: the graticule is real,
   the pins sit on their true coordinates, and nothing is illustrated.        */
