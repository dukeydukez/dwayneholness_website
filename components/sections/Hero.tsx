"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const gradientY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--black)",
      }}
    >
      {/* Background photo — faded */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <Image
          src="/images/CorexRBC-5194.jpg"
          alt=""
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center 40%",
            opacity: 0.18,
          }}
          priority
        />
      </div>

      {/* Parallax gradient */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          y: gradientY,
        }}
      />

      {/* Vertical rule accent */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "2rem",
          top: "50%",
          transform: "translateY(-50%)",
          width: "1px",
          height: "40vh",
          backgroundColor: "rgba(201,168,76,0.3)",
        }}
      />

      {/* Parallax content block */}
      <motion.div
        className="hero-content"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "8rem 2rem 6rem",
          width: "100%",
          y: contentY,
          opacity: contentOpacity,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--gold)",
            fontWeight: 500,
            marginBottom: "2rem",
          }}
        >
          Speaker · Media Infrastructure · Strategist
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(2.25rem, 6.5vw, 5.5rem)",
            fontWeight: 700,
            lineHeight: 1.0,
            color: "var(--cream)",
            letterSpacing: "-0.03em",
            maxWidth: "20ch",
            marginBottom: "2.5rem",
          }}
        >
          Most brands have content.
          <br />
          Few have{" "}
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
            infrastructure.
          </em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "var(--cream-dim)",
            lineHeight: 1.7,
            maxWidth: "52ch",
            marginBottom: "3rem",
            fontWeight: 400,
          }}
        >
          I build media infrastructure that turns founders and enterprise
          brands into the undeniable authority in their market.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
          <a
            href="https://calendar.app.google/qeycC86WguwLnjt1A"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.9375rem 2.25rem",
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
          <Link
            href="/work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.9375rem 2.25rem",
              border: "1px solid rgba(200,194,180,0.4)",
              color: "var(--cream)",
              fontSize: "0.8125rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 500,
              textDecoration: "none",
              transition: "box-shadow 0.3s ease, border-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 20px rgba(200,194,180,0.2)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(200,194,180,0.75)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(200,194,180,0.4)";
            }}
          >
            View Work
          </Link>
        </motion.div>

        {/* Scroll cue */}
        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "5rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <motion.div
            animate={{ scaleY: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "1px",
              height: "3rem",
              backgroundColor: "rgba(201,168,76,0.4)",
              transformOrigin: "top",
            }}
          />
          <p
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--cream-dim)",
            }}
          >
            Scroll
          </p>
        </div>
      </motion.div>
    </section>
  );
}
