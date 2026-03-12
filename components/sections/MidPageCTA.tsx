"use client";
import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function MidPageCTA() {
  return (
    <section
      style={{
        backgroundColor: "var(--charcoal)",
        padding: "5rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease }}
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
        }}
      >
        <p
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--gold)",
            fontWeight: 500,
            marginBottom: "1.25rem",
          }}
        >
          Ready to Build?
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "var(--cream)",
            letterSpacing: "-0.02em",
            marginBottom: "1.25rem",
          }}
        >
          Stop creating content.
          <br />
          Start building{" "}
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
            infrastructure.
          </em>
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--cream-dim)",
            lineHeight: 1.7,
            maxWidth: "48ch",
            margin: "0 auto 2.25rem",
          }}
        >
          Book a free strategy call. We&apos;ll diagnose where you are, where you
          need to go, and what it takes to get there.
        </p>
        <a
          href="https://calendar.app.google/qeycC86WguwLnjt1A"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.9375rem 2.5rem",
            backgroundColor: "var(--gold)",
            color: "var(--black)",
            fontSize: "0.8125rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 600,
            textDecoration: "none",
            transition: "box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.boxShadow =
              "0 0 28px rgba(201,168,76,0.5)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.boxShadow = "none")
          }
        >
          Book a Call <span aria-hidden>→</span>
        </a>
      </motion.div>
    </section>
  );
}
