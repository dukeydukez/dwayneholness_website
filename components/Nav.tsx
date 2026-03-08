"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/speaking", label: "Speaking" },
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Thoughts" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "1.25rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.15)" : "1px solid transparent",
        transition: "background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      {/* Wordmark */}
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-display), Georgia, serif",
          fontSize: "1.25rem",
          fontWeight: 500,
          color: "var(--cream)",
          letterSpacing: "0.01em",
          textDecoration: "none",
        }}
      >
        Dwayne Holness
      </Link>

      {/* Desktop nav */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2.5rem",
        }}
        className="hidden md:flex"
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{
              fontSize: "0.8125rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 500,
              color: pathname === href ? "var(--gold)" : "var(--cream-dim)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (pathname !== href)
                (e.target as HTMLElement).style.color = "var(--cream)";
            }}
            onMouseLeave={(e) => {
              if (pathname !== href)
                (e.target as HTMLElement).style.color = "var(--cream-dim)";
            }}
          >
            {label}
          </Link>
        ))}
        <a
          href="https://calendar.app.google/qeycC86WguwLnjt1A"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "0.625rem 1.5rem",
            backgroundColor: "var(--gold)",
            color: "var(--black)",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 600,
            textDecoration: "none",
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.backgroundColor = "var(--gold-light)")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.backgroundColor = "var(--gold)")
          }
        >
          Book a Call
        </a>
      </nav>

      {/* Mobile toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden"
        aria-label="Toggle menu"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          padding: "4px",
        }}
      >
        {/* Bar 0 — top, rotates to top arm of X */}
        <motion.span
          animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          style={{
            display: "block",
            width: "24px",
            height: "1px",
            backgroundColor: "var(--cream)",
            transformOrigin: "center",
          }}
        />
        {/* Bar 1 — middle, fades out */}
        <motion.span
          animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          style={{
            display: "block",
            width: "24px",
            height: "1px",
            backgroundColor: "var(--cream)",
            transformOrigin: "center",
          }}
        />
        {/* Bar 2 — bottom, rotates to bottom arm of X */}
        <motion.span
          animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          style={{
            display: "block",
            width: "24px",
            height: "1px",
            backgroundColor: "var(--cream)",
            transformOrigin: "center",
          }}
        />
      </button>

      {/* Mobile menu — elastic spring in/out */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.92, y: -12 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            exit={{ opacity: 0, scaleY: 0.94, y: -10 }}
            transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.85 }}
            style={{
              position: "fixed",
              top: "70px",
              left: 0,
              right: 0,
              backgroundColor: "var(--charcoal)",
              borderBottom: "1px solid rgba(201,168,76,0.2)",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              transformOrigin: "top center",
            }}
          >
            {links.map(({ href, label }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 28,
                  delay: i * 0.06,
                }}
              >
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: "1.5rem",
                    fontFamily: "var(--font-display), Georgia, serif",
                    color: pathname === href ? "var(--gold)" : "var(--cream)",
                    textDecoration: "none",
                    display: "block",
                  }}
                >
                  {label}
                </Link>
              </motion.div>
            ))}

            {/* Book a Call CTA — staggers in last */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 28,
                delay: links.length * 0.06,
              }}
            >
              <a
                href="https://calendar.app.google/qeycC86WguwLnjt1A"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "inline-block",
                  padding: "0.875rem 2rem",
                  backgroundColor: "var(--gold)",
                  color: "var(--black)",
                  fontSize: "0.875rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  textDecoration: "none",
                  textAlign: "center",
                  marginTop: "0.5rem",
                }}
              >
                Book a Call
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
