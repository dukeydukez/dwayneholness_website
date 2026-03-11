"use client";
import { useState, useEffect } from "react";

export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    // Increment view on mount, return updated count
    fetch(`/api/views/${encodeURIComponent(slug)}`, { method: "POST" })
      .then((r) => r.json())
      .then((data) => setViews(data.views ?? 0))
      .catch(() => {
        // Fallback: just fetch current count
        fetch(`/api/views/${encodeURIComponent(slug)}`)
          .then((r) => r.json())
          .then((data) => setViews(data.views ?? 0))
          .catch(() => setViews(0));
      });
  }, [slug]);

  if (views === null) return null;

  return (
    <span
      style={{
        fontSize: "0.8125rem",
        color: "var(--cream-dim)",
      }}
    >
      {views.toLocaleString()} {views === 1 ? "view" : "views"}
    </span>
  );
}
