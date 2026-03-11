"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type FormEvent } from "react";

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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    href: "https://x.com/dukeydukez",
    label: "X",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/MrHolness",
    label: "Facebook",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "var(--gold)",
          }}
        >
          You're in.
        </p>
        <p style={{ fontSize: "0.875rem", color: "var(--cream-dim)", marginTop: "0.5rem" }}>
          You'll hear from me when there's something worth reading.
        </p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", maxWidth: "480px", margin: "0 auto" }}>
      <p
        style={{
          fontFamily: "var(--font-display), Georgia, serif",
          fontSize: "1.25rem",
          fontWeight: 600,
          color: "var(--cream)",
          marginBottom: "0.5rem",
        }}
      >
        Frameworks, not fluff.
      </p>
      <p
        style={{
          fontSize: "0.875rem",
          color: "var(--cream-dim)",
          lineHeight: 1.7,
          marginBottom: "1.5rem",
        }}
      >
        Get frameworks on creative infrastructure, thought leadership, and brand authority. No spam.
      </p>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            flex: "1 1 240px",
            maxWidth: "320px",
            padding: "0.75rem 1.25rem",
            backgroundColor: "rgba(200,194,180,0.06)",
            border: "1px solid rgba(201,168,76,0.25)",
            color: "var(--cream)",
            fontSize: "0.875rem",
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            padding: "0.75rem 1.75rem",
            backgroundColor: "var(--gold)",
            color: "var(--black)",
            fontSize: "0.6875rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 700,
            border: "none",
            cursor: status === "loading" ? "wait" : "pointer",
            transition: "opacity 0.15s ease",
            opacity: status === "loading" ? 0.7 : 1,
          }}
        >
          {status === "loading" ? "Joining..." : "Subscribe"}
        </button>
      </form>
      {status === "error" && (
        <p style={{ fontSize: "0.75rem", color: "#e55", marginTop: "0.75rem" }}>
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const isArticlePage = pathname.startsWith("/writing/") && pathname !== "/writing";

  return (
    <footer
      style={{
        backgroundColor: "var(--charcoal)",
        borderTop: "1px solid rgba(201,168,76,0.12)",
      }}
    >
      {/* Newsletter bar — hidden on article pages */}
      {!isArticlePage && (
        <div
          style={{
            padding: "4rem 2rem",
            borderBottom: "1px solid rgba(200,194,180,0.08)",
          }}
        >
          <FooterNewsletter />
        </div>
      )}

      {/* Main footer grid */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "4rem 2rem 2rem",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "3rem",
        }}
        className="md-grid-cols-3"
      >
        {/* Brand column */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "1.375rem",
              fontWeight: 500,
              color: "var(--cream)",
              marginBottom: "0.875rem",
            }}
          >
            Dwayne Holness
          </p>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--cream-dim)",
              lineHeight: 1.8,
              maxWidth: "32ch",
            }}
          >
            Speaker, brand architect, and strategist helping founders build media systems that compound authority over time.
          </p>
        </div>

        {/* Navigation column */}
        <div>
          <p
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontWeight: 600,
              marginBottom: "1.25rem",
            }}
          >
            Navigate
          </p>
          <div style={{ display: "flex", flexDirection: "row", gap: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: "0.875rem",
                  color: "var(--cream-dim)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--cream)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--cream-dim)")
                }
              >
                {label}
              </Link>
            ))}
            <a
              href="https://calendar.app.google/qeycC86WguwLnjt1A"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.875rem",
                color: "var(--gold)",
                textDecoration: "none",
                fontWeight: 500,
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--gold-light)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--gold)")
              }
            >
              Book a Call →
            </a>
          </div>
        </div>

        {/* Connect column */}
        <div>
          <p
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontWeight: 600,
              marginBottom: "1.25rem",
            }}
          >
            Connect
          </p>
          <div style={{ display: "flex", flexDirection: "row", gap: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
            {socialLinks.map(({ href, label, icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.875rem",
                  color: "var(--cream-dim)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--cream)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--cream-dim)")
                }
              >
                {icon}
                {label}
              </a>
            ))}
            <a
              href="mailto:dwayne@corexcreative.com"
              style={{
                fontSize: "0.875rem",
                color: "var(--cream-dim)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--cream)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--cream-dim)")
              }
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 6L2 7" />
              </svg>
              dwayne@corexcreative.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem",
          borderTop: "1px solid rgba(200,194,180,0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <p style={{ fontSize: "0.75rem", color: "var(--cream-dim)", opacity: 0.5 }}>
          © {new Date().getFullYear()} Dwayne Holness. All rights reserved.
        </p>
        <p style={{ fontSize: "0.75rem", color: "var(--cream-dim)", opacity: 0.35 }}>
          Toronto, Canada
        </p>
      </div>
    </footer>
  );
}
