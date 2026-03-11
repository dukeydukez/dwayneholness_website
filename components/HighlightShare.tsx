"use client";
import { useState, useEffect, useCallback } from "react";

export default function HighlightShare() {
  const [selection, setSelection] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  const handleMouseUp = useCallback(() => {
    // Small delay to let the browser finalize the selection
    setTimeout(() => {
      const sel = window.getSelection();
      const text = sel?.toString().trim();
      if (!text || text.length < 10) {
        setSelection(null);
        return;
      }

      const range = sel?.getRangeAt(0);
      if (!range) return;

      const rect = range.getBoundingClientRect();
      setSelection({
        text,
        x: rect.left + rect.width / 2,
        y: rect.top + window.scrollY - 12,
      });
    }, 10);
  }, []);

  const handleMouseDown = useCallback(() => {
    setSelection(null);
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handleMouseUp, handleMouseDown]);

  function shareOnX() {
    if (!selection) return;
    const quote = selection.text.length > 240
      ? selection.text.slice(0, 237) + "..."
      : selection.text;
    const url = window.location.href;
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(`"${quote}"`)}&url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setSelection(null);
    window.getSelection()?.removeAllRanges();
  }

  function copyQuote() {
    if (!selection) return;
    navigator.clipboard.writeText(`"${selection.text}"`);
    setSelection(null);
    window.getSelection()?.removeAllRanges();
  }

  if (!selection) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: selection.y,
        left: selection.x,
        transform: "translate(-50%, -100%)",
        zIndex: 100,
        display: "flex",
        gap: "2px",
        backgroundColor: "var(--charcoal)",
        border: "1px solid rgba(201,168,76,0.3)",
        padding: "4px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
      }}
    >
      <button
        onClick={shareOnX}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.375rem",
          padding: "0.375rem 0.75rem",
          backgroundColor: "transparent",
          border: "none",
          color: "var(--gold)",
          fontSize: "0.6875rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "background-color 0.15s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(201,168,76,0.1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Post
      </button>
      <button
        onClick={copyQuote}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.375rem",
          padding: "0.375rem 0.75rem",
          backgroundColor: "transparent",
          border: "none",
          color: "var(--cream-dim)",
          fontSize: "0.6875rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "background-color 0.15s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(200,194,180,0.08)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        Copy
      </button>
      {/* Arrow pointer */}
      <div
        style={{
          position: "absolute",
          bottom: "-6px",
          left: "50%",
          transform: "translateX(-50%) rotate(45deg)",
          width: "10px",
          height: "10px",
          backgroundColor: "var(--charcoal)",
          borderRight: "1px solid rgba(201,168,76,0.3)",
          borderBottom: "1px solid rgba(201,168,76,0.3)",
        }}
      />
    </div>
  );
}
