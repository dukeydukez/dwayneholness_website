"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  CLIENTS_MORE,
  CLIENT_LOGOS,
  CREDITS,
  ERAS,
  EVENTS,
  LANES,
  STATS,
  THROUGH_LINES,
  VENTURES,
  DETAILS,
  AMBITIONS,
  type Lane,
  type TimelineEvent,
} from "@/lib/timeline-data";

const FIRST = ERAS[0].from;
const LAST = ERAS[ERAS.length - 1].to;
const SPAN = LAST - FIRST;

const eraFor = (year: number) => ERAS.find((e) => year >= e.from && year <= e.to) ?? ERAS[0];
const pctFor = (year: number) => ((year - FIRST) / SPAN) * 100;

type YearBlock = { year: number; events: TimelineEvent[]; eraStart: boolean };

function buildYears(): YearBlock[] {
  const byYear = new Map<number, TimelineEvent[]>();
  for (const ev of EVENTS) {
    const list = byYear.get(ev.year) ?? [];
    list.push(ev);
    byYear.set(ev.year, list);
  }
  const seen = new Set<string>();
  return [...byYear.keys()]
    .sort((a, b) => a - b)
    .map((year) => {
      const era = eraFor(year);
      const eraStart = !seen.has(era.id);
      seen.add(era.id);
      return { year, events: byYear.get(year)!, eraStart };
    });
}

/* Film grain, drawn once to a canvas rather than shipped as an image. */
function Grain() {
  const [tile, setTile] = useState<string | null>(null);
  useEffect(() => {
    // Render the noise once at its natural size and tile it. Stretching a small
    // canvas across the viewport turns the grain into visible mosaic blocks,
    // which the light theme exposes badly.
    const S = 160;
    const cvs = document.createElement("canvas");
    cvs.width = S;
    cvs.height = S;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    const img = ctx.createImageData(S, S);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 128 + (Math.random() - 0.5) * 190;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    setTile(cvs.toDataURL("image/png"));
  }, []);
  if (!tile) return null;
  return (
    <div
      className="tl-grain"
      aria-hidden="true"
      style={{ backgroundImage: `url(${tile})`, backgroundRepeat: "repeat", backgroundSize: "160px 160px" }}
    />
  );
}

function Plate({ plate }: { plate: NonNullable<TimelineEvent["plate"]> }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-9%", "9%"]);

  const portrait = plate.h > plate.w;

  return (
    <figure className={`tl-plate${portrait ? " is-portrait" : ""}`} ref={ref}>
      <div
        className="tl-plate-frame"
        style={{ aspectRatio: `${plate.w} / ${plate.h}` }}
      >
        <motion.div className="tl-plate-move" style={{ y }}>
          <Image
            src={plate.src}
            alt={plate.alt}
            width={plate.w}
            height={plate.h}
            sizes="(max-width: 900px) 100vw, 60vw"
            className="tl-plate-img"
          />
        </motion.div>
        <div className="tl-plate-veil" aria-hidden="true" />
      </div>
      <figcaption>{plate.caption}</figcaption>
    </figure>
  );
}

export default function TimelineExperience() {
  const years = useMemo(buildYears, []);
  const reduced = useReducedMotion();

  const [activeYear, setActiveYear] = useState(years[0].year);
  const [railUp, setRailUp] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [lanes, setLanes] = useState<Set<Lane>>(new Set());

  const heroRef = useRef<HTMLElement>(null);
  const yearRefs = useRef(new Map<number, HTMLElement>());
  const trackRef = useRef<HTMLDivElement>(null);

  const era = eraFor(activeYear);

  /* Hero parallax: three planes moving at different rates. */
  const { scrollYProgress: heroP } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const ghostY = useTransform(heroP, [0, 1], ["0%", reduced ? "0%" : "38%"]);
  const ghostO = useTransform(heroP, [0, 0.85], [1, 0]);
  const titleY = useTransform(heroP, [0, 1], ["0%", reduced ? "0%" : "-14%"]);
  const metaY = useTransform(heroP, [0, 1], ["0%", reduced ? "0%" : "-32%"]);

  /* Active year: whichever act's top sits closest to the reading line.
     Computed on scroll rather than by observer alone, so it stays correct
     through programmatic jumps as well as ordinary scrolling. */
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const line = window.innerHeight * 0.32;
      let bestYear = -1;
      let bestDist = Number.POSITIVE_INFINITY;
      yearRefs.current.forEach((el, year) => {
        const dist = Math.abs(el.getBoundingClientRect().top - line);
        if (dist < bestDist) {
          bestDist = dist;
          bestYear = year;
        }
      });
      if (bestYear > 0) setActiveYear(bestYear);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const heroIo = new IntersectionObserver(
      ([e]) => setRailUp(!e.isIntersecting),
      { threshold: 0.15 },
    );
    if (heroRef.current) heroIo.observe(heroRef.current);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      heroIo.disconnect();
    };
  }, []);

  const goToYear = useCallback((year: number) => {
    const el = yearRefs.current.get(year);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  /* Scrub: map a pointer position on the rail to the nearest recorded year. */
  const scrubFrom = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const r = track.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
      const target = FIRST + ratio * SPAN;
      const nearest = years.reduce((best, y) =>
        Math.abs(y.year - target) < Math.abs(best.year - target) ? y : best,
      );
      setPlaying(false);
      goToYear(nearest.year);
    },
    [years, goToYear],
  );

  const onTrackDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    scrubFrom(e.clientX);
  };
  const onTrackMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons === 1) scrubFrom(e.clientX);
  };

  const onTrackKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const i = years.findIndex((y) => y.year === activeYear);
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setPlaying(false);
      goToYear(years[Math.min(years.length - 1, i + 1)].year);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setPlaying(false);
      goToYear(years[Math.max(0, i - 1)].year);
    } else if (e.key === "Home") {
      e.preventDefault();
      goToYear(years[0].year);
    } else if (e.key === "End") {
      e.preventDefault();
      goToYear(years[years.length - 1].year);
    }
  };

  /* Play: walk the record one year at a time. */
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      const i = years.findIndex((y) => y.year === activeYear);
      if (i >= years.length - 1) {
        setPlaying(false);
        return;
      }
      goToYear(years[i + 1].year);
    }, 2600);
    return () => window.clearInterval(id);
  }, [playing, activeYear, years, goToYear]);

  const toggleLane = (lane: Lane) =>
    setLanes((prev) => {
      const next = new Set(prev);
      if (next.has(lane)) next.delete(lane);
      else next.add(lane);
      return next;
    });

  const isMuted = (lane: Lane) => lanes.size > 0 && !lanes.has(lane);

  return (
    <div className="tl" style={{ ["--era" as string]: era.hue }}>
      <div className="tl-wash" aria-hidden="true" />
      <Grain />

      <div className="tl-inner">
        {/* ── Hero ── */}
        <header className="tl-hero" ref={heroRef}>
          <motion.div
            className="tl-hero-ghost"
            aria-hidden="true"
            style={{ y: ghostY, opacity: ghostO }}
          >
            1988
          </motion.div>

          <motion.div style={{ y: titleY }}>
            <p className="tl-eyebrow">A working record, 1988 to 2026</p>
            <h1>
              Time <em>Capsoul</em>
            </h1>
            <p className="tl-deck">Everything, in order.</p>
            <p className="tl-hero-lede">
              Thirty-eight years of Dwayne Winston Holness, laid out the way he
              works: a timeline you can scrub. It starts with a five-year-old
              arriving from Kingston and runs to a filmmaker who built an agency,
              a book and a body of work. Drag the rail at the bottom, or press
              play and let it run.
            </p>
          </motion.div>

          <motion.div className="tl-hero-meta" style={{ y: metaY }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="tl-stat-v">{s.value}</div>
                <div className="tl-stat-l">{s.label}</div>
                <div className="tl-stat-d">{s.detail}</div>
              </div>
            ))}
          </motion.div>

          <div className="tl-cue" aria-hidden="true">
            <span className="tl-cue-line" />
            <span>Scroll, or drag the rail</span>
          </div>
        </header>

        {/* ── Lane filters ── */}
        <div className="tl-filters">
          {(Object.keys(LANES) as Lane[]).map((lane) => (
            <button
              key={lane}
              type="button"
              className="tl-filter"
              aria-pressed={lanes.has(lane)}
              onClick={() => toggleLane(lane)}
            >
              {LANES[lane].short}
            </button>
          ))}
          {lanes.size > 0 && (
            <button
              type="button"
              className="tl-filter"
              onClick={() => setLanes(new Set())}
            >
              Show all
            </button>
          )}
        </div>

        {/* ── The record ── */}
        <main>
          {years.map((block) => {
            const blockEra = eraFor(block.year);
            return (
              <div key={block.year}>
                {block.eraStart && (
                  <section
                    className="tl-era"
                    style={{ ["--era" as string]: blockEra.hue }}
                  >
                    <p className="tl-era-n">
                      Act {ERAS.findIndex((e) => e.id === blockEra.id) + 1} of{" "}
                      {ERAS.length}
                    </p>
                    <h2>{blockEra.name}</h2>
                    <p className="tl-era-sub">{blockEra.sub}</p>
                    <p className="tl-era-span">
                      {blockEra.from} &ndash; {blockEra.to}
                    </p>
                  </section>
                )}

                <section
                  className={`tl-year${block.year === activeYear ? " is-active" : ""}`}
                  style={{ ["--era" as string]: blockEra.hue }}
                  data-year={block.year}
                  id={`year-${block.year}`}
                  ref={(el) => {
                    if (el) yearRefs.current.set(block.year, el);
                  }}
                  aria-label={`${block.year}`}
                >
                  <div className="tl-year-marker">
                    <div className="tl-year-n">{block.year}</div>
                    <div className="tl-year-count">
                      {block.events.length}{" "}
                      {block.events.length === 1 ? "entry" : "entries"}
                    </div>
                    <div className="tl-year-era">{blockEra.name}</div>
                  </div>

                  <div className="tl-events">
                    {block.events.map((ev, i) => (
                      <article
                        key={`${ev.year}-${i}`}
                        className={`tl-ev${isMuted(ev.lane) ? " is-muted" : ""}`}
                      >
                        <div className="tl-ev-top">
                          <span className="tl-lane">{LANES[ev.lane].label}</span>
                          {ev.date && <span className="tl-date">{ev.date}</span>}
                          {ev.tag && <span className="tl-tag">{ev.tag}</span>}
                        </div>
                        <h3>{ev.title}</h3>
                        {ev.body && <p>{ev.body}</p>}
                        {ev.quote && (
                          <blockquote className="tl-quote">
                            &ldquo;{ev.quote}&rdquo;
                          </blockquote>
                        )}
                        {ev.plate && <Plate plate={ev.plate} />}
                        {ev.embargo && (
                          <p className="tl-embargo">Embargoed &middot; {ev.embargo}</p>
                        )}
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            );
          })}
        </main>

        {/* ── Through-lines ── */}
        <section className="tl-close">
          <h2>What runs through all of it</h2>
          <p className="tl-close-lede">
            The dates are the surface. These are the six things underneath them,
            and they have not changed since 1993.
          </p>
          <div className="tl-lines">
            {THROUGH_LINES.map((l) => (
              <div className="tl-line" key={l.title}>
                <h3>{l.title}</h3>
                <p>{l.body}</p>
                {l.img && (
                  <figure className="tl-line-img">
                    <div className="tl-line-frame">
                      <Image
                        src={l.img.src}
                        alt={l.img.alt}
                        width={l.img.w}
                        height={l.img.h}
                        sizes="(max-width: 720px) 100vw, 33vw"
                      />
                      <div className="tl-plate-veil" aria-hidden="true" />
                    </div>
                    {(l.img.placeholder || l.img.caption) && (
                      <figcaption>
                        {l.img.placeholder ? "Placeholder image" : l.img.caption}
                      </figcaption>
                    )}
                  </figure>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Credits ── */}
        <section className="tl-close tl-credits-wrap">
          <h2>The work behind the camera</h2>
          <p className="tl-close-lede">
            Directed, edited and shot. Separate from the sixty-six screen
            productions in the timeline above, which are performance credits.
          </p>

          {CREDITS.map((group) => (
            <div className="tl-cgroup" key={group.discipline}>
              <div className="tl-cgroup-head">
                <h3>{group.discipline}</h3>
                {group.note && <p>{group.note}</p>}
                <span className="tl-cgroup-n">
                  {group.credits.length}{" "}
                  {group.credits.length === 1 ? "credit" : "credits"}
                </span>
              </div>
              <ol className="tl-credits">
                {group.credits.map((cr) => (
                  <li className="tl-credit" key={`${cr.year}-${cr.title}`}>
                    <span className="tl-credit-y">{cr.year}</span>
                    <span className="tl-credit-t">{cr.title}</span>
                    <span className="tl-credit-r">{cr.role}</span>
                    <span className="tl-credit-c">{cr.client ?? ""}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </section>

        {/* ── Ventures ── */}
        <section className="tl-close">
          <h2>Things he started</h2>
          <p className="tl-close-lede">
            Twelve entries. Four are closed, and those matter as much as the
            ones still running.
          </p>
          <ol className="tl-ventures">
            {VENTURES.map((v) => (
              <li className={`tl-venture${v.live ? " is-live" : ""}`} key={v.name}>
                <span className="tl-venture-span">{v.span}</span>
                <span className="tl-venture-name">{v.name}</span>
                <span className="tl-venture-role">{v.role}</span>
                <span className="tl-venture-note">{v.note}</span>
                <span className="tl-venture-state">{v.live ? "Running" : "Closed"}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Clients ── */}
        <section className="tl-close">
          <h2>Who the work was for</h2>
          <p className="tl-close-lede">
            A selection. Brands, broadcasters, public institutions and artists.
          </p>
          <div className="tl-logos">
            {CLIENT_LOGOS.map((l) => (
              <div className="tl-logo" key={l.alt}>
                <Image src={l.src} alt={l.alt} width={l.w} height={48} />
              </div>
            ))}
          </div>
          <p className="tl-clients-more">{CLIENTS_MORE}</p>
        </section>

        {/* ── The small print ── */}
        <section className="tl-close">
          <h2>The small print</h2>
          <p className="tl-close-lede">
            Things that do not belong on a timeline but are true anyway.
          </p>
          <dl className="tl-details">
            {DETAILS.map((d) => (
              <div className="tl-detail" key={d.label}>
                <dt>{d.label}</dt>
                <dd>{d.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Still to come ── */}
        <section className="tl-close">
          <h2>Not done yet</h2>
          <p className="tl-close-lede">
            Three things that have not happened.
          </p>
          <div className="tl-lines">
            {AMBITIONS.map((a) => (
              <div className="tl-line" key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Close ── */}
        <section className="tl-end">
          <p className="tl-eyebrow">The record so far</p>
          <h2>
            Still <em>building</em>
          </h2>
          <p>
            This page ends in 2026 because that is where the evidence ends, not
            because the work does. It gets updated as new things land, and as
            older things are recovered. The stretch between 2002 and 2005 is
            still missing, and so are the titles of the early FEVA originals.
          </p>
          <a className="tl-end-cta" href="mailto:dwayne@corexcreative.com">
            dwayne@corexcreative.com
          </a>
        </section>

        <footer className="tl-foot">
          <span>
            A living record. Last updated 3 September 2026.
          </span>
          <span>{EVENTS.length} entries across {years.length} years.</span>
        </footer>
      </div>

      {/* ── Scrub rail ── */}
      <div className={`tl-rail${railUp ? " is-up" : ""}`}>
        <div className="tl-rail-year">{activeYear}</div>

        <div
          className="tl-track"
          ref={trackRef}
          role="slider"
          tabIndex={0}
          aria-label="Scrub through the years"
          aria-valuemin={FIRST}
          aria-valuemax={LAST}
          aria-valuenow={activeYear}
          aria-valuetext={`${activeYear}, ${era.name}`}
          onPointerDown={onTrackDown}
          onPointerMove={onTrackMove}
          onKeyDown={onTrackKey}
        >
          <div className="tl-track-line" />
          {ERAS.map((e) => (
            <div
              key={e.id}
              className="tl-track-seg"
              style={{
                left: `${pctFor(e.from)}%`,
                width: `${((e.to - e.from) / SPAN) * 100}%`,
                background: e.hue,
              }}
            />
          ))}
          {years.map((y) => (
            <div
              key={y.year}
              className={`tl-tick${y.year === activeYear ? " is-on" : ""}`}
              style={{
                left: `${pctFor(y.year)}%`,
                height: `${Math.min(24, 7 + y.events.length * 3.5)}px`,
              }}
            />
          ))}
          <div className="tl-head" style={{ left: `${pctFor(activeYear)}%` }} />

          <div className="tl-track-labels" aria-hidden="true">
            {ERAS.filter((e) => (e.to - e.from) / SPAN > 0.06).map((e) => (
              <span
                key={e.id}
                className={`tl-track-label${e.id === era.id ? " is-on" : ""}`}
                style={{
                  left: `${pctFor(e.from)}%`,
                  width: `${((e.to - e.from) / SPAN) * 100}%`,
                  color: e.hue,
                }}
              >
                {e.short}
              </span>
            ))}
          </div>
        </div>

        <p className="tl-sr" aria-live="polite">
          {activeYear}, {era.name}
        </p>

        <button
          type="button"
          className="tl-play"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause the timeline" : "Play the timeline"}
        >
          {playing ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}
