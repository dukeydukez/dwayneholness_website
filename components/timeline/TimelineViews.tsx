"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { EVENTS, ERAS, LANES, type Lane, type TimelineEvent } from "@/lib/timeline-data";

function eraFor(year: number) {
  return ERAS.find((e) => year >= e.from && year <= e.to) ?? ERAS[ERAS.length - 1];
}

function when(e: TimelineEvent) {
  return e.date ? `${e.date} ${e.year}` : `${e.year}`;
}

/* ── Contact sheet ─────────────────────────────────────────────────────── */

export function ContactSheet({ onJump }: { onJump: (year: number) => void }) {
  const shots = useMemo(() => EVENTS.filter((e) => e.plate), []);
  return (
    <section className="tl-sheet-wrap">
      <header className="tl-view-head">
        <p className="tl-eyebrow">Contact sheet</p>
        <h2>
          Every <em>frame</em>
        </h2>
        <p className="tl-view-lede">
          The {shots.length} photographs on this page, in order. Click one to
          open its year.
        </p>
      </header>

      <div className="tl-sheet">
        {shots.map((e) => {
          const era = eraFor(e.year);
          const portrait = e.plate!.h > e.plate!.w;
          return (
            <button
              type="button"
              key={`${e.year}-${e.title}`}
              className={`tl-cell${portrait ? " is-portrait" : ""}`}
              style={{ ["--era" as string]: era.hue }}
              onClick={() => onJump(e.year)}
              aria-label={`${e.title}, ${when(e)}`}
            >
              <span className="tl-cell-img">
                <Image
                  src={e.plate!.src}
                  alt=""
                  width={portrait ? 300 : 420}
                  height={portrait ? 450 : 280}
                  quality={58}
                  loading="lazy"
                  sizes="(max-width: 700px) 45vw, (max-width: 1100px) 30vw, 260px"
                />
              </span>
              <span className="tl-cell-meta">
                <span className="tl-cell-year">{e.year}</span>
                <span className="tl-cell-title">{e.title}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ── Index ─────────────────────────────────────────────────────────────── */

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
