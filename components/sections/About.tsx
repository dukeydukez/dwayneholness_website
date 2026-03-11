"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const pillars = [
  {
    label: "Infrastructure",
    body: "Media systems built to generate demand, compound authority, and sustain growth, without burning out the founder.",
  },
  {
    label: "Thought Leadership",
    body: "Positioning strategy and narrative architecture that establishes you as the definitive voice in your category.",
  },
  {
    label: "Ecosystems",
    body: "End-to-end creative ecosystems that connect brand, media, community, and revenue into one self-reinforcing system.",
  },
];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function About() {
  return (
    <section
      style={{
        backgroundColor: "var(--charcoal)",
        padding: "7rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gap: "4rem",
        }}
        className="about-grid"
      >
        {/* Left — bio text + pillars */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
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
            About
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(2.25rem, 4vw, 3.25rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "var(--cream)",
              letterSpacing: "-0.02em",
              marginBottom: "2rem",
            }}
          >
            Building media ecosystems that{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
              outlast the moment.
            </em>
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--cream-dim)",
              lineHeight: 1.8,
              marginBottom: "1.5rem",
            }}
          >
            I&apos;m Dwayne Holness, a Toronto-based speaker, brand
            architect, and Founder of Corex Creative Inc. For over a
            decade, I&apos;ve helped founders and enterprise brands turn content
            into systems, building the kind of media infrastructure that
            generates authority, compounds attention, and creates category
            leadership.
          </p>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--cream-dim)",
              lineHeight: 1.8,
              marginBottom: "3rem",
            }}
          >
            My work sits at the intersection of media strategy, thought
            leadership, and ecosystem design, helping founders move from
            well-kept secret to undeniable, category-defining presence.
          </p>

          {/* Pillars */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {pillars.map(({ label, body }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                style={{
                  paddingLeft: "1.5rem",
                  borderLeft: "1px solid rgba(201,168,76,0.3)",
                }}
              >
                <p
                  style={{
                    fontSize: "0.6875rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    fontWeight: 500,
                    marginBottom: "0.625rem",
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontSize: "0.9375rem",
                    color: "var(--cream-dim)",
                    lineHeight: 1.7,
                  }}
                >
                  {body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — portrait image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          style={{ position: "relative" }}
        >
          {/* Offset border accent — rendered first so image sits on top */}
          <div
            style={{
              position: "absolute",
              top: "1.25rem",
              left: "-1.25rem",
              right: "1.25rem",
              bottom: "-1.25rem",
              border: "1px solid rgba(201,168,76,0.18)",
              pointerEvents: "none",
            }}
          />
          {/* Image container — z-index 1 keeps it above the border frame */}
          <div style={{ position: "relative", overflow: "hidden", zIndex: 1 }}>
            <Image
              src="/images/DH1.png"
              alt="Dwayne Holness"
              width={360}
              height={540}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
              priority
            />
            {/* Subtle gold fade at bottom */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "30%",
                background:
                  "linear-gradient(to top, rgba(201,168,76,0.08) 0%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
