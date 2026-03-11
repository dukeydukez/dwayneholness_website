"use client";

import { useState, useEffect, type FormEvent } from "react";
import { usePathname } from "next/navigation";

const DISMISS_KEY = "newsletter_popup_dismissed";
const DISMISS_DAYS = 14;

function isDismissed(): boolean {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    const dismissed = Number(raw);
    const daysSince = (Date.now() - dismissed) / (1000 * 60 * 60 * 24);
    return daysSince < DISMISS_DAYS;
  } catch {
    return false;
  }
}

function setDismissed(): void {
  try {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  } catch {
    // silent
  }
}

export default function NewsletterPopup() {
  const pathname = usePathname();
  const isArticlePage = pathname.startsWith("/writing/") && pathname !== "/writing";

  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    // Don't show on article pages or mobile (<768px)
    if (isArticlePage) return;
    if (window.innerWidth < 768) return;
    if (isDismissed()) return;

    function onScroll() {
      const scrollPercent =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent >= 0.5) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isArticlePage]);

  function handleClose() {
    setClosing(true);
    setDismissed();
    setTimeout(() => setVisible(false), 300);
  }

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
        setDismissed();
        setTimeout(handleClose, 3000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
          opacity: closing ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Popup */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: closing
            ? "translate(-50%, -50%) scale(0.95)"
            : "translate(-50%, -50%) scale(1)",
          zIndex: 1000,
          width: "90%",
          maxWidth: "480px",
          backgroundColor: "var(--charcoal)",
          border: "1px solid rgba(201,168,76,0.2)",
          padding: "3rem 2.5rem",
          opacity: closing ? 0 : 1,
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close popup"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--cream-dim)",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.15s ease",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "var(--cream)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "var(--cream-dim)")
          }
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>

        {status === "success" ? (
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--gold)",
              }}
            >
              You're in.
            </p>
            <p style={{ fontSize: "0.875rem", color: "var(--cream-dim)", marginTop: "0.75rem" }}>
              You'll hear from me when there's something worth reading.
            </p>
          </div>
        ) : (
          <>
            {/* Gold accent line */}
            <div
              style={{
                width: "40px",
                height: "2px",
                backgroundColor: "var(--gold)",
                marginBottom: "1.5rem",
              }}
            />

            <p
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--cream)",
                lineHeight: 1.2,
                marginBottom: "0.75rem",
              }}
            >
              Frameworks, not fluff.
            </p>
            <p
              style={{
                fontSize: "0.9375rem",
                color: "var(--cream-dim)",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              Get frameworks on creative infrastructure, thought leadership, and brand authority.
              No spam, just signal.
            </p>

            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                gap: "0.5rem",
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
                  flex: "1 1 200px",
                  padding: "0.8rem 1.25rem",
                  backgroundColor: "rgba(200,194,180,0.06)",
                  border: "1px solid rgba(201,168,76,0.25)",
                  color: "var(--cream)",
                  fontSize: "0.9375rem",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  padding: "0.8rem 2rem",
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

            <p
              style={{
                fontSize: "0.6875rem",
                color: "var(--cream-dim)",
                opacity: 0.4,
                marginTop: "1.25rem",
              }}
            >
              Unsubscribe anytime. No spam, ever.
            </p>
          </>
        )}
      </div>
    </>
  );
}
