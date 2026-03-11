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

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // If user has manually set a preference, always use it
    const isManual = localStorage.getItem("theme-manual") === "1";
    const stored = localStorage.getItem("theme") as Theme | null;

    if (isManual && stored) {
      setTheme(stored);
      applyTheme(stored);
      return;
    }

    // Auto: try to get location and set theme from sun position
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
        // Location denied — fall back to stored or dark
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

  // Sun icon for dark mode (click to go light), Moon icon for light mode (click to go dark)
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
      {theme === "dark" ? (
        // Sun icon — switch to light
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      ) : (
        // Moon icon — switch to dark
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
