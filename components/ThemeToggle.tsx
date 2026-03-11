"use client";
import { useState, useEffect } from "react";
import SunCalc from "suncalc";

type Theme = "dark" | "light";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
  } else {
    root.removeAttribute("data-theme");
  }
}

function themeFromSun(lat: number, lng: number): Theme {
  const now = new Date();
  const { sunrise, sunset } = SunCalc.getTimes(now, lat, lng);
  return now >= sunrise && now <= sunset ? "light" : "dark";
}

interface ThemeToggleProps {
  /** Show a full-width labeled row for mobile menus */
  expanded?: boolean;
}

export default function ThemeToggle({ expanded = false }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const isManual = localStorage.getItem("theme-manual") === "1";
    const stored = localStorage.getItem("theme") as Theme | null;

    if (isManual && stored) {
      setTheme(stored);
      applyTheme(stored);
      return;
    }

    if (!navigator.geolocation) {
      const fallback: Theme = stored ?? "dark";
      setTheme(fallback);
      applyTheme(fallback);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const auto = themeFromSun(pos.coords.latitude, pos.coords.longitude);
        setTheme(auto);
        applyTheme(auto);
      },
      () => {
        const fallback: Theme = stored ?? "dark";
        setTheme(fallback);
        applyTheme(fallback);
      },
      { timeout: 5000 }
    );
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("theme", next);
    localStorage.setItem("theme-manual", "1");
  }

  const sunIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );

  const moonIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );

  if (expanded) {
    const isDark = theme === "dark";
    return (
      <button
        onClick={toggle}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "none",
          border: "1px solid rgba(200,194,180,0.12)",
          cursor: "pointer",
          padding: "1rem 1.25rem",
          transition: "border-color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.4)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,194,180,0.12)";
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.2rem" }}>
          <span style={{
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--cream-dim)",
            opacity: 0.5,
          }}>
            Appearance
          </span>
          <span style={{
            fontSize: "0.8125rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "var(--gold)",
          }}>
            {isDark ? "Night Mode" : "Day Mode"}
          </span>
        </div>
        <span style={{ color: "var(--gold)", display: "flex", alignItems: "center" }}>
          {isDark ? sunIcon : moonIcon}
        </span>
      </button>
    );
  }

  // Default compact icon toggle (desktop nav)
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "var(--cream-dim)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.375rem",
        transition: "color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--gold)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--cream-dim)";
      }}
    >
      {theme === "dark" ? sunIcon : moonIcon}
    </button>
  );
}
