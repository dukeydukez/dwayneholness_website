"use client";

import Link from "next/link";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/speaking", label: "Speaking" },
  { href: "/writing", label: "Writing" },
];

const socialLinks = [
  { href: "https://www.instagram.com/dukeydukez/", label: "Instagram" },
  { href: "https://www.facebook.com/MrHolness", label: "Facebook" },
  { href: "https://linkedin.com/in/dwayneholness", label: "LinkedIn" },
  { href: "https://x.com/dukeydukez", label: "Twitter" },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--charcoal)",
        borderTop: "1px solid rgba(201,168,76,0.15)",
        padding: "5rem 2rem 3rem",
      }}
    >
      <div
        style={{
          maxWidth: "560px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "2.75rem",
        }}
      >
        {/* Brand */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "1.375rem",
              fontWeight: 500,
              color: "var(--cream)",
              marginBottom: "0.625rem",
            }}
          >
            Dwayne Holness
          </p>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--cream-dim)",
              lineHeight: 1.7,
            }}
          >
            Speaker · Media Infrastructure · Strategist
            <br />
            Toronto, Canada.
          </p>
        </div>

        {/* Nav */}
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
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
                ((e.target as HTMLElement).style.color = "var(--cream)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--cream-dim)")
              }
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Social */}
        <div>
          <p
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontWeight: 500,
              marginBottom: "1.25rem",
            }}
          >
            Connect
          </p>
          <div style={{ display: "flex", gap: "1.75rem", flexWrap: "wrap", justifyContent: "center" }}>
            {socialLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.875rem",
                  color: "var(--cream-dim)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--cream)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--cream-dim)")
                }
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "rgba(200,194,180,0.1)",
          }}
        />

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <a
            href="mailto:dwayne@corexcreative.com"
            style={{
              fontSize: "0.8125rem",
              color: "var(--cream-dim)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "var(--gold)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "var(--cream-dim)")
            }
          >
            dwayne@corexcreative.com
          </a>
          <p style={{ fontSize: "0.8125rem", color: "var(--cream-dim)", opacity: 0.6 }}>
            © {new Date().getFullYear()} Dwayne Holness. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
