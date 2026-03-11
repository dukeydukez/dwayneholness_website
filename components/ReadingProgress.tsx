"use client";
import { useState, useEffect } from "react";

/** Parse "X min read" to get total minutes */
function parseTotalMinutes(readTime: string): number {
  const match = readTime.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 5;
}

export default function ReadingProgress({ readTime }: { readTime: string }) {
  const totalMin = parseTotalMinutes(readTime);
  const [currentMin, setCurrentMin] = useState(0);

  useEffect(() => {
    function onScroll() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const progress = Math.min(window.scrollY / docHeight, 1);
      setCurrentMin(Math.round(progress * totalMin));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [totalMin]);

  return (
    <span
      style={{
        fontSize: "0.8125rem",
        color: "var(--gold)",
      }}
    >
      {currentMin} of {totalMin} min read
    </span>
  );
}
