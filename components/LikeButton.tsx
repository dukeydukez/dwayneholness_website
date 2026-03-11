"use client";
import { useState, useEffect, useRef, useCallback } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
}

export default function LikeButton({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [bounce, setBounce] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const nextId = useRef(0);

  // Fetch current count on mount
  useEffect(() => {
    fetch(`/api/likes/${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data) => setCount(data.count ?? 0))
      .catch(() => setCount(0));
  }, [slug]);

  const spawnParticles = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const cx = btn.offsetWidth / 2;
    const cy = btn.offsetHeight / 2;
    const newParticles: Particle[] = Array.from({ length: 7 }, () => ({
      id: nextId.current++,
      x: cx + (Math.random() - 0.5) * 30,
      y: cy,
      dx: (Math.random() - 0.5) * 50,
      dy: -(30 + Math.random() * 40),
    }));
    setParticles((p) => [...p, ...newParticles]);
    newParticles.forEach(({ id }) => {
      setTimeout(() => setParticles((p) => p.filter((q) => q.id !== id)), 900);
    });
  }, []);

  function handleLike() {
    // Optimistic update
    setCount((c) => (c ?? 0) + 1);
    spawnParticles();
    setBounce(true);
    setTimeout(() => setBounce(false), 300);

    // Persist to backend
    fetch(`/api/likes/${encodeURIComponent(slug)}`, { method: "POST" })
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.count === "number") {
          setCount(data.count);
        }
      })
      .catch(() => {
        // Revert on failure
        setCount((c) => Math.max((c ?? 1) - 1, 0));
      });
  }

  if (count === null) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
        marginTop: "3rem",
        paddingTop: "2.5rem",
        borderTop: "1px solid rgba(200,194,180,0.1)",
      }}
    >
      <div style={{ position: "relative", display: "inline-block" }}>
        <button
          ref={btnRef}
          onClick={handleLike}
          aria-label="Like this article"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: "rgba(201,168,76,0.08)",
            border: "1px solid rgba(201,168,76,0.4)",
            color: "var(--gold)",
            fontSize: "1rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            cursor: "pointer",
            transition: "background-color 0.2s ease, border-color 0.2s ease",
            position: "relative",
          }}
        >
          <span
            style={{
              fontSize: "1.25rem",
              lineHeight: 1,
              display: "inline-block",
              transform: bounce ? "scale(1.4)" : "scale(1)",
              transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            ♥
          </span>
          <span style={{ fontSize: "0.9375rem" }}>{count}</span>
        </button>

        {/* Heart particles */}
        {particles.map((p) => (
          <span
            key={p.id}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              fontSize: `${0.8 + Math.random() * 0.5}rem`,
              color: "var(--gold)",
              pointerEvents: "none",
              userSelect: "none",
              opacity: 0,
              animation: `heartFloat_${p.id % 4} 0.9s ease-out forwards`,
            }}
          >
            ♥
          </span>
        ))}

        <style>{`
          @keyframes heartFloat_0 { 0% { transform: translate(0,0) scale(1); opacity: 1; } 100% { transform: translate(-25px,-55px) scale(0.3); opacity: 0; } }
          @keyframes heartFloat_1 { 0% { transform: translate(0,0) scale(1); opacity: 1; } 100% { transform: translate(20px,-60px) scale(0.3); opacity: 0; } }
          @keyframes heartFloat_2 { 0% { transform: translate(0,0) scale(1); opacity: 1; } 100% { transform: translate(-10px,-50px) scale(0.3); opacity: 0; } }
          @keyframes heartFloat_3 { 0% { transform: translate(0,0) scale(1); opacity: 1; } 100% { transform: translate(30px,-45px) scale(0.3); opacity: 0; } }
        `}</style>
      </div>

      <p
        style={{
          fontSize: "0.8125rem",
          color: "var(--cream-dim)",
          opacity: 0.65,
          letterSpacing: "0.04em",
        }}
      >
        If this resonated, tap the heart.
      </p>
    </div>
  );
}
