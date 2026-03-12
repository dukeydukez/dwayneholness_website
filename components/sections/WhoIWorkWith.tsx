"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const profiles = [
  {
    id: "01",
    title: "Growth-Stage Founders",
    description:
      "You have traction but no media system. You know content matters, but you need infrastructure that compounds, not another content calendar that dies in two weeks.",
    outcome: "Walk away with a positioning strategy, content architecture, and 90-day roadmap.",
    link: "/packages",
    cta: "Explore Strategy Sessions",
  },
  {
    id: "02",
    title: "Enterprise Marketing Teams",
    description:
      "You need a creative partner who thinks in systems, not campaigns. Someone who can build media infrastructure that generates authority and scales without losing quality.",
    outcome: "End-to-end brand storytelling, documentary content, and distribution systems.",
    link: "/packages",
    cta: "See Production & Strategy",
  },
  {
    id: "03",
    title: "Conference & Event Organizers",
    description:
      "You want a speaker who brings frameworks and real experience, not motivational cliches. Someone who has built a multi-million dollar creative agency from the ground up.",
    outcome: "Keynotes, panels, and workshops on brand architecture, thought leadership, and creative ecosystems.",
    link: "/speaking",
    cta: "Book Dwayne to Speak",
  },
];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function WhoIWorkWith() {
  return (
    <section
      style={{
        backgroundColor: "var(--black)",
        padding: "7rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          style={{ marginBottom: "4rem" }}
        >
          <p
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontWeight: 500,
              marginBottom: "1rem",
            }}
          >
            Who I Work With
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "var(--cream)",
              letterSpacing: "-0.02em",
              maxWidth: "24ch",
            }}
          >
            Built for people who are{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
              serious about building.
            </em>
          </h2>
        </motion.div>

        <div
          className="md-grid-cols-3"
          style={{
            display: "grid",
            gap: "2rem",
          }}
        >
          {profiles.map(({ id, title, description, outcome, link, cta }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease }}
              style={{
                padding: "2.5rem 2rem",
                backgroundColor: "var(--charcoal)",
                border: "1px solid rgba(200,194,180,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                transition: "border-color 0.3s ease",
              }}
              whileHover={{
                borderColor: "rgba(201,168,76,0.25)",
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--gold)",
                  letterSpacing: "0.08em",
                  fontWeight: 500,
                }}
              >
                {id}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "1.375rem",
                  fontWeight: 600,
                  color: "var(--cream)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "var(--cream-dim)",
                  lineHeight: 1.7,
                }}
              >
                {description}
              </p>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--cream)",
                  lineHeight: 1.6,
                  paddingLeft: "1rem",
                  borderLeft: "1px solid rgba(201,168,76,0.3)",
                  fontWeight: 500,
                }}
              >
                {outcome}
              </p>
              <div style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
                <Link
                  href={link}
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    textDecoration: "none",
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "gap 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.gap = "0.75rem")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.gap = "0.5rem")
                  }
                >
                  {cta} <span aria-hidden>→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
