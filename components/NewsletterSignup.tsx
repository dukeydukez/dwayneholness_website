"use client";
import { useState, type FormEvent } from "react";

export default function NewsletterSignup() {
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
      <div
        style={{
          marginTop: "3rem",
          padding: "2.5rem",
          backgroundColor: "rgba(201,168,76,0.06)",
          borderLeft: "3px solid var(--gold)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "var(--cream)",
            marginBottom: "0.5rem",
          }}
        >
          You're in.
        </p>
        <p style={{ fontSize: "0.9375rem", color: "var(--cream-dim)", lineHeight: 1.7 }}>
          You'll hear from me when there's something worth reading.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: "3rem",
        padding: "2.5rem",
        backgroundColor: "rgba(201,168,76,0.04)",
        border: "1px solid rgba(201,168,76,0.15)",
      }}
    >
      <p
        style={{
          fontSize: "0.6875rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--gold)",
          fontWeight: 500,
          marginBottom: "0.75rem",
        }}
      >
        Stay in the loop
      </p>
      <p
        style={{
          fontFamily: "var(--font-display), Georgia, serif",
          fontSize: "1.375rem",
          fontWeight: 600,
          color: "var(--cream)",
          lineHeight: 1.2,
          marginBottom: "0.75rem",
          letterSpacing: "-0.01em",
        }}
      >
        Frameworks, not fluff.
      </p>
      <p
        style={{
          fontSize: "0.9375rem",
          color: "var(--cream-dim)",
          lineHeight: 1.7,
          marginBottom: "1.5rem",
          maxWidth: "50ch",
        }}
      >
        I write about building creative infrastructure, thought leadership systems, and
        the real work behind brand authority. No spam, no filler.
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            flex: "1 1 240px",
            padding: "0.75rem 1.25rem",
            backgroundColor: "rgba(200,194,180,0.06)",
            border: "1px solid rgba(201,168,76,0.3)",
            color: "var(--cream)",
            fontSize: "0.9375rem",
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            padding: "0.75rem 2rem",
            backgroundColor: "var(--gold)",
            color: "var(--black)",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 700,
            border: "none",
            cursor: status === "loading" ? "wait" : "pointer",
            transition: "opacity 0.15s ease",
            opacity: status === "loading" ? 0.7 : 1,
          }}
        >
          {status === "loading" ? "Joining..." : "Join"}
        </button>
      </form>
      {status === "error" && (
        <p style={{ fontSize: "0.8125rem", color: "#e55", marginTop: "0.75rem" }}>
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
