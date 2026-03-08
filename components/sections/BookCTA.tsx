"use client";
import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function BookCTA() {
  return (
    <section
      style={{
        backgroundColor: "var(--charcoal)",
        padding: "7rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease }}
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
        }}
      >
        <p
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--gold)",
            fontWeight: 500,
            marginBottom: "1.5rem",
          }}
        >
          Let&apos;s Work Together
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            color: "var(--cream)",
            letterSpacing: "-0.025em",
            marginBottom: "1.75rem",
          }}
        >
          Build media that
          <br />
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
            compounds.
          </em>
        </h2>
        <p
          style={{
            fontSize: "1.0625rem",
            color: "var(--cream-dim)",
            lineHeight: 1.75,
            maxWidth: "52ch",
            margin: "0 auto 3rem",
          }}
        >
          Whether you&apos;re a founder ready to turn content into infrastructure,
          a brand building thought leadership at scale, or an organization
          designing a creative ecosystem. Let&apos;s talk about what that looks
          like together.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="https://calendar.app.google/qeycC86WguwLnjt1A"
            target="_blank"
            rel="noopener noreferrer"
            id="book"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2.5rem",
              backgroundColor: "var(--gold)",
              color: "var(--black)",
              fontSize: "0.875rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Book a Call <span aria-hidden>→</span>
          </a>
          <a
            href="mailto:dwayne@corexcreative.com"
            onClick={(e) => { e.preventDefault(); window.open("mailto:dwayne@corexcreative.com", "_blank"); }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2.5rem",
              border: "1px solid rgba(200,194,180,0.3)",
              color: "var(--cream)",
              fontSize: "0.875rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Send an Email
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
