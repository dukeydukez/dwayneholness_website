"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const topics = [
  "Media Infrastructure for Founders",
  "Building Thought Leadership Systems",
  "The Architecture of Creative Ecosystems",
  "From Content to Category Leader",
];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function SpeakingPreview() {
  return (
    <section
      style={{
        backgroundColor: "var(--charcoal-light)",
        padding: "7rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accent */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "40%",
          backgroundImage:
            "radial-gradient(ellipse 80% 80% at 80% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "4rem",
          alignItems: "center",
        }}
        className="md:grid-cols-2"
      >
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          <p
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontWeight: 500,
              marginBottom: "1.5rem",
            }}
          >
            Speaking &amp; Consulting
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "var(--cream)",
              letterSpacing: "-0.02em",
              marginBottom: "1.75rem",
            }}
          >
            The frameworks that
            <br />
            build category leaders.
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--cream-dim)",
              lineHeight: 1.8,
              marginBottom: "2.5rem",
              maxWidth: "48ch",
            }}
          >
            Available for keynotes, panels, and strategic consulting
            engagements. I speak on media infrastructure, thought leadership
            systems, and the architecture of creative ecosystems for founders
            ready to own their category.
          </p>
          <Link
            href="/speaking"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 2rem",
              backgroundColor: "var(--gold)",
              color: "var(--black)",
              fontSize: "0.8125rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Speaking &amp; Consulting <span aria-hidden>→</span>
          </Link>
        </motion.div>

        {/* Right — topic list */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
        >
          <p
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--cream-dim)",
              marginBottom: "1.5rem",
            }}
          >
            Topics
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {topics.map((topic, i) => (
              <motion.div
                key={topic}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease }}
                style={{
                  padding: "1.25rem 0",
                  borderTop:
                    i === 0
                      ? "1px solid rgba(200,194,180,0.2)"
                      : "1px solid rgba(200,194,180,0.08)",
                  borderBottom:
                    i === topics.length - 1
                      ? "1px solid rgba(200,194,180,0.2)"
                      : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontSize: "1.125rem",
                    color: "var(--cream)",
                    fontWeight: 400,
                  }}
                >
                  {topic}
                </span>
                <span style={{ color: "var(--gold)", opacity: 0.6 }}>→</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
