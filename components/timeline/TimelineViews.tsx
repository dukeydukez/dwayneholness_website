"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { EVENTS, ERAS, LANES, PLACES, type Lane, type TimelineEvent } from "@/lib/timeline-data";

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


/* ── Map ───────────────────────────────────────────────────────────────────
   An equirectangular plot cropped to the bounds of the record, drawn as a
   navigator's chart rather than a decorative world map: the graticule is real,
   the pins sit on their true coordinates, and nothing is illustrated.        */

const LON0 = -148, LON1 = 62, LAT0 = -14, LAT1 = 71;
const MW = 1000;
const MH = Math.round((MW * (LAT1 - LAT0)) / (LON1 - LON0));
const px = (lon: number) => ((lon - LON0) / (LON1 - LON0)) * MW;
const py = (lat: number) => ((LAT1 - lat) / (LAT1 - LAT0)) * MH;

export function MapView() {
  const [active, setActive] = useState<string | null>(null);
  const sorted = useMemo(
    // Lighter pins first so heavier ones sit on top: where two places overlap
    // at world scale, the one more of the work came from should win the hover.
    () => [...PLACES].sort((a, b) => a.weight - b.weight || py(a.lat) - py(b.lat)),
    []
  );
  const shown = active ? PLACES.find((p) => p.name === active) : null;

  // A pin's hit area is capped at half the gap to its nearest neighbour, so a
  // big pin can never swallow a small one that sits close to it on the plot.
  const hits = useMemo(() => {
    const m = new Map<string, number>();
    for (const a of PLACES) {
      let near = Infinity;
      for (const b of PLACES) {
        if (b.name === a.name) continue;
        near = Math.min(near, Math.hypot(px(a.lon) - px(b.lon), py(a.lat) - py(b.lat)));
      }
      const r = a.weight === 3 ? 9 : a.weight === 2 ? 6.5 : 4.5;
      m.set(a.name, Math.max(Math.min(r + 4, near / 2), r));
    }
    return m;
  }, []);

  const lons: number[] = [];
  for (let l = -150; l <= 60; l += 30) lons.push(l);
  const lats: number[] = [];
  for (let l = -10; l <= 70; l += 20) lats.push(l);

  return (
    <section className="tl-map-wrap">
      <header className="tl-view-head">
        <p className="tl-eyebrow">The map</p>
        <h2>
          Where the <em>work</em> went
        </h2>
        <p className="tl-view-lede">
          {PLACES.length} places the record actually puts him, plotted on their
          real coordinates. Most of them were reconstructed from the GPS in his
          own photographs.
        </p>
      </header>

      <div className="tl-map">
        <svg viewBox={`0 0 ${MW} ${MH}`} role="img" aria-label="A plot of every location in the record">
          <g className="tl-grat">
            {lons.map((l) => (
              <line key={`x${l}`} x1={px(l)} y1={0} x2={px(l)} y2={MH} />
            ))}
            {lats.map((l) => (
              <line key={`y${l}`} x1={0} y1={py(l)} x2={MW} y2={py(l)} />
            ))}
          </g>
          <line className="tl-equator" x1={0} y1={py(0)} x2={MW} y2={py(0)} />
          <text className="tl-eq-label" x={6} y={py(0) - 7}>EQUATOR</text>

          {/* Region anchors. Labels only: no coastlines are drawn, because none
              would be accurate at this scale and a wrong one is worse than none. */}
          <g className="tl-regions" aria-hidden="true">
            {(
              [
                ["NORTH AMERICA", -104, 52],
                ["CARIBBEAN", -74, 24],
                ["WEST AFRICA", -8, 6],
                ["EUROPE", 12, 62],
                ["EAST AFRICA", 44, 13],
              ] as const
            ).map(([label, lon, lat]) => (
              <text key={label} x={px(lon)} y={py(lat)}>
                {label}
              </text>
            ))}
          </g>

          {sorted.map((p) => {
            const r = p.weight === 3 ? 9 : p.weight === 2 ? 6.5 : 4.5;
            const hit = hits.get(p.name) ?? r;
            const on = active === p.name;
            return (
              <g
                key={p.name}
                className={`tl-pin${on ? " is-on" : ""}`}
                transform={`translate(${px(p.lon)} ${py(p.lat)})`}
                onMouseEnter={() => setActive(p.name)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(p.name)}
                onBlur={() => setActive(null)}
                tabIndex={0}
                role="button"
                aria-label={`${p.name}, ${p.region}, ${p.years}`}
              >
                <circle className="tl-pin-hit" r={hit} />
                <circle className="tl-pin-halo" r={r * 2.4} />
                <circle className="tl-pin-dot" r={r} />
                <text className="tl-pin-label" x={r + 6} y={4}>
                  {p.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="tl-map-read" aria-live="polite">
        {shown ? (
          <>
            <h3>
              {shown.name}
              <span>{shown.region}</span>
            </h3>
            <p className="tl-map-years">{shown.years}</p>
            <p>{shown.note}</p>
          </>
        ) : (
          <p className="tl-map-hint">
            Hover or tab through a point to read it. Larger points are where more
            of the work happened.
          </p>
        )}
      </div>
    </section>
  );
}
