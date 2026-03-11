"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const REACTIONS = [
  { type: "heart", emoji: "♥", label: "Love" },
  { type: "fire", emoji: "🔥", label: "Fire" },
  { type: "lightbulb", emoji: "💡", label: "Insightful" },
  { type: "accurate", emoji: "🎯", label: "Accurate" },
] as const;

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export default function ReactionBar({ slug }: { slug: string }) {
  const [counts, setCounts] = useState<Record<string, number> | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [bouncing, setBouncing] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  useEffect(() => {
    fetch(`/api/reactions/${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data) => setCounts(data.reactions ?? {}))
      .catch(() => setCounts({}));
  }, [slug]);

  const spawnParticles = useCallback((emoji: string, btnEl: HTMLButtonElement) => {
    const rect = btnEl.getBoundingClientRect();
    const barRect = barRef.current?.getBoundingClientRect();
    if (!barRect) return;
    const cx = rect.left - barRect.left + rect.width / 2;
    const cy = rect.top - barRect.top + rect.height / 2;
    const newParticles: Particle[] = Array.from({ length: 5 }, () => ({
      id: nextId.current++,
      x: cx + (Math.random() - 0.5) * 20,
      y: cy,
      emoji,
    }));
    setParticles((p) => [...p, ...newParticles]);
    newParticles.forEach(({ id }) => {
      setTimeout(() => setParticles((p) => p.filter((q) => q.id !== id)), 900);
    });
  }, []);

  function handleReact(type: string, emoji: string, e: React.MouseEvent<HTMLButtonElement>) {
    setCounts((prev) => ({
      ...prev,
      [type]: ((prev ?? {})[type] ?? 0) + 1,
    }));
    spawnParticles(emoji, e.currentTarget);
    setBouncing(type);
    setTimeout(() => setBouncing(null), 300);

    fetch(`/api/reactions/${encodeURIComponent(slug)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.count === "number") {
          setCounts((prev) => ({ ...prev, [type]: data.count }));
        }
      })
      .catch(() => {
        setCounts((prev) => ({
          ...prev,
          [type]: Math.max(((prev ?? {})[type] ?? 1) - 1, 0),
        }));
      });
  }

  if (counts === null) return null;

  return (
    <div
      style={{
        marginTop: "3rem",
        paddingTop: "2.5rem",
        borderTop: "1px solid rgba(200,194,180,0.1)",
      }}
    >
      <p
        style={{
          fontSize: "0.6875rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--cream-dim)",
          marginBottom: "1.25rem",
          opacity: 0.65,
        }}
      >
        If this resonated
      </p>
      <div
        ref={barRef}
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          position: "relative",
        }}
      >
        {REACTIONS.map(({ type, emoji, label }) => (
          <button
            key={type}
            onClick={(e) => handleReact(type, emoji, e)}
            aria-label={label}
            title={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              padding: "0.625rem 1.25rem",
              backgroundColor: "rgba(201,168,76,0.06)",
              border: "1px solid rgba(201,168,76,0.25)",
              color: "var(--gold)",
              fontSize: "0.9375rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              cursor: "pointer",
              transition: "background-color 0.15s ease, border-color 0.15s ease, transform 0.15s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(201,168,76,0.12)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(201,168,76,0.06)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.25)";
            }}
          >
            <span
              style={{
                fontSize: "1.125rem",
                lineHeight: 1,
                display: "inline-block",
                transform: bouncing === type ? "scale(1.4)" : "scale(1)",
                transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              {emoji}
            </span>
            <span style={{ fontSize: "0.875rem" }}>{counts[type] ?? 0}</span>
          </button>
        ))}

        {/* Particles */}
        {particles.map((p) => (
          <span
            key={p.id}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              fontSize: "1rem",
              pointerEvents: "none",
              userSelect: "none",
              opacity: 0,
              animation: `reactionFloat_${p.id % 4} 0.9s ease-out forwards`,
            }}
          >
            {p.emoji}
          </span>
        ))}

        <style>{`
          @keyframes reactionFloat_0 { 0% { transform: translate(0,0) scale(1); opacity: 1; } 100% { transform: translate(-20px,-50px) scale(0.3); opacity: 0; } }
          @keyframes reactionFloat_1 { 0% { transform: translate(0,0) scale(1); opacity: 1; } 100% { transform: translate(15px,-55px) scale(0.3); opacity: 0; } }
          @keyframes reactionFloat_2 { 0% { transform: translate(0,0) scale(1); opacity: 1; } 100% { transform: translate(-8px,-45px) scale(0.3); opacity: 0; } }
          @keyframes reactionFloat_3 { 0% { transform: translate(0,0) scale(1); opacity: 1; } 100% { transform: translate(22px,-40px) scale(0.3); opacity: 0; } }
        `}</style>
      </div>
    </div>
  );
}
