"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const topics = [
  {
    title: "Brand Architecture for Founders",
    description:
      "Most founders build content. Few build infrastructure. This talk covers the systems, workflows, and distribution architecture that turn consistent output into compounding authority.",
  },
  {
    title: "Building Thought Leadership Systems",
    description:
      "Thought leadership isn't a content strategy. It's a positioning strategy. I break down how to build a repeatable system that generates authority, not just visibility.",
  },
  {
    title: "The Architecture of Creative Ecosystems",
    description:
      "How brands move from campaign-driven creative to ecosystem-driven output. A framework for building internal creative capacity that scales without losing quality.",
  },
  {
    title: "From Content to Category Leader",
    description:
      "The frameworks founders use to establish category leadership — not through volume, but through strategic positioning and consistent point of view.",
  },
];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function SpeakingPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
        className="md-grid-cols-2"
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
            Accepting select keynotes, panels, and strategic consulting
            engagements, schedule permitting. I speak on brand architecture,
            thought leadership systems, and the architecture of creative
            ecosystems for founders ready to own their category.
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
            {topics.map(({ title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease }}
                style={{
                  borderTop:
                    i === 0
                      ? "1px solid rgba(200,194,180,0.2)"
                      : "1px solid rgba(200,194,180,0.08)",
                  borderBottom:
                    i === topics.length - 1
                      ? "1px solid rgba(200,194,180,0.2)"
                      : "none",
                }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "1.25rem 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display), sans-serif",
                      fontSize: "1.125rem",
                      color: openIndex === i ? "var(--gold)" : "var(--cream)",
                      fontWeight: 400,
                      transition: "color 0.2s ease",
                    }}
                  >
                    {title}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 90 : 0 }}
                    transition={{ duration: 0.2, ease }}
                    style={{
                      color: "var(--gold)",
                      opacity: openIndex === i ? 1 : 0.6,
                      flexShrink: 0,
                      display: "inline-block",
                    }}
                  >
                    →
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      key="desc"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          fontSize: "0.9375rem",
                          color: "var(--cream-dim)",
                          lineHeight: 1.75,
                          paddingBottom: "1.25rem",
                          maxWidth: "48ch",
                        }}
                      >
                        {description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
