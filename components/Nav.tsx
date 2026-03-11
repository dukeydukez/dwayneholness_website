"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { href: "/speaking", label: "Speaking" },
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Thoughts" },
  { href: "/packages", label: "Packages" },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/dukeydukez/",
    label: "Instagram",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "https://linkedin.com/in/dwayneholness",
    label: "LinkedIn",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    href: "https://x.com/dukeydukez",
    label: "X / Twitter",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/MrHolness",
    label: "Facebook",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open + notify chatbot
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    document.dispatchEvent(new CustomEvent("nav-menu-toggle", { detail: { open: menuOpen } }));
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
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
          backgroundColor: menuOpen
            ? "transparent"
            : scrolled
            ? "var(--nav-bg-scrolled)"
            : "transparent",
          backdropFilter: scrolled && !menuOpen ? "blur(12px)" : "none",
          borderBottom: scrolled && !menuOpen ? "1px solid rgba(201,168,76,0.15)" : "1px solid transparent",
          transition: "background-color 0.3s ease, border-color 0.3s ease",
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "1.25rem",
            fontWeight: 500,
            color: "var(--cream)",
            letterSpacing: "0.01em",
            textDecoration: "none",
            zIndex: 60,
            position: "relative",
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
          className="desktop-only"
        >
          {navLinks.map(({ href, label }) => (
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
          <ThemeToggle />
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

        {/* Hamburger / Close toggle — mobile only */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-only"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            padding: "4px",
            zIndex: 60,
            position: "relative",
          }}
        >
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
      </header>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 40,
              backgroundColor: "var(--black)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "7rem 2rem 3rem",
              overflow: "hidden",
            }}
          >
            {/* Nav links — massive display stack */}
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {navLinks.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    delay: i * 0.07,
                  }}
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: "var(--font-display), Georgia, serif",
                      fontSize: "clamp(3.5rem, 14vw, 7rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.0,
                      textTransform: "uppercase",
                      color: "var(--cream)",
                      textDecoration: "none",
                      display: "block",
                      transition: "color 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--cream)";
                    }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              {/* Book a Call as a nav item */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  delay: navLinks.length * 0.07,
                }}
              >
                <a
                  href="https://calendar.app.google/qeycC86WguwLnjt1A"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "clamp(3.5rem, 14vw, 7rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.0,
                    textTransform: "uppercase",
                    color: "var(--cream)",
                    textDecoration: "none",
                    display: "block",
                    transition: "color 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--cream)";
                  }}
                >
                  Book a Call
                </a>
              </motion.div>
            </nav>

            {/* Bottom bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                borderTop: "1px solid rgba(200,194,180,0.12)",
                paddingTop: "1.5rem",
              }}
            >
              {/* Expanded theme toggle */}
              <ThemeToggle expanded />

              {/* Socials row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p
                  style={{
                    fontSize: "0.6875rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--cream-dim)",
                    margin: 0,
                    opacity: 0.5,
                  }}
                >
                  dwayneholness.com
                </p>
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                  {socialLinks.map(({ href, label, icon }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      style={{
                        color: "var(--cream-dim)",
                        display: "flex",
                        alignItems: "center",
                        transition: "color 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "var(--cream-dim)";
                      }}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
