"use client";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function FreeResource() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Connection issue. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      style={{
        backgroundColor: "var(--charcoal)",
        padding: "7rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background texture */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gap: "4rem",
          alignItems: "center",
          position: "relative",
        }}
        className="md-grid-cols-2"
      >
        {/* Left — copy */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
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
              marginBottom: "1.25rem",
            }}
          >
            Free Resource
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "var(--cream)",
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}
          >
            10 Frameworks for{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
              Creative Ownership.
            </em>
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--cream-dim)",
              lineHeight: 1.8,
              marginBottom: "1.5rem",
              maxWidth: "48ch",
            }}
          >
            The playbook I use to help founders and brands take full ownership of
            their creative output. Ten frameworks for building media that
            compounds, not content that expires.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              marginBottom: "0.5rem",
            }}
          >
            {[
              "Brand positioning and narrative architecture",
              "Content infrastructure that scales",
              "Systems for thought leadership",
              "Distribution that compounds over time",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                }}
              >
                <span
                  style={{
                    color: "var(--gold)",
                    fontSize: "0.75rem",
                    lineHeight: "1.6rem",
                    flexShrink: 0,
                  }}
                >
                  ✦
                </span>
                <span
                  style={{
                    fontSize: "0.9375rem",
                    color: "var(--cream-dim)",
                    lineHeight: 1.6,
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — download form */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          style={{
            padding: "3rem 2.5rem",
            backgroundColor: "var(--black)",
            border: "1px solid rgba(200,194,180,0.1)",
          }}
        >
          {submitted ? (
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  fontWeight: 600,
                  marginBottom: "1rem",
                }}
              >
                You&apos;re In
              </p>
              <p
                style={{
                  fontSize: "1.25rem",
                  fontFamily: "var(--font-display), sans-serif",
                  color: "var(--cream)",
                  fontWeight: 600,
                  marginBottom: "1.5rem",
                }}
              >
                Your download is ready.
              </p>
              <a
                href="/resources/10_Frameworks_Creative_Ownership.pdf"
                download
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
                Download PDF <span aria-hidden>↓</span>
              </a>
            </div>
          ) : (
            <>
              <p
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  fontWeight: 600,
                  marginBottom: "1rem",
                }}
              >
                Free Download
              </p>
              <p
                style={{
                  fontSize: "1.125rem",
                  fontFamily: "var(--font-display), sans-serif",
                  color: "var(--cream)",
                  fontWeight: 600,
                  marginBottom: "0.75rem",
                  lineHeight: 1.3,
                }}
              >
                Get the 10 frameworks that power every brand we build.
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--cream-dim)",
                  lineHeight: 1.6,
                  marginBottom: "2rem",
                }}
              >
                Drop your email and get instant access to the PDF.
              </p>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "0.875rem 1rem",
                    backgroundColor: "rgba(200,194,180,0.06)",
                    border: error
                      ? "1px solid rgba(220,80,80,0.5)"
                      : "1px solid rgba(200,194,180,0.15)",
                    color: "var(--cream)",
                    fontSize: "0.9375rem",
                    outline: "none",
                    marginBottom: "0.75rem",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => {
                    if (!error)
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(201,168,76,0.4)";
                  }}
                  onBlur={(e) => {
                    if (!error)
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(200,194,180,0.15)";
                  }}
                />
                {error && (
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(220,80,80,0.9)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "0.9375rem",
                    backgroundColor: "var(--gold)",
                    color: "var(--black)",
                    border: "none",
                    fontSize: "0.8125rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.7 : 1,
                    transition: "box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading)
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 0 28px rgba(201,168,76,0.5)";
                  }}
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.boxShadow = "none")
                  }
                >
                  {loading ? "Sending..." : "Get Free Access →"}
                </button>
              </form>
              <p
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--cream-dim)",
                  opacity: 0.5,
                  marginTop: "1rem",
                  textAlign: "center",
                }}
              >
                No spam. Unsubscribe anytime.
              </p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
