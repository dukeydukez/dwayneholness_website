"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Article } from "@/lib/articles";
import { INITIAL_LIKES } from "@/lib/likes";

/** Render a title string that may contain *highlighted* segments. */
function renderInlineTitle(text: string): React.ReactNode {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <em key={i} style={{ fontStyle: "italic", color: "var(--gold)" }}>
        {part.slice(1, -1)}
      </em>
    ) : (
      part
    )
  );
}

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const PAGE_SIZE = 5;

type SortMode = "recent" | "popular";

export default function WritingList({ articles = [] }: { articles: Article[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [sortMode, setSortMode] = useState<SortMode>("recent");
  // slug → { heart: N, fire: N, lightbulb: N, accurate: N }
  const [reactionCounts, setReactionCounts] = useState<Record<string, Record<string, number>>>({});
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});

  // Fetch all reaction counts and view counts
  useEffect(() => {
    Promise.all(
      articles.map((a) =>
        fetch(`/api/reactions/${encodeURIComponent(a.slug)}`)
          .then((r) => r.json())
          .then((data) => [a.slug, (data.reactions ?? {})] as const)
          .catch(() => [a.slug, { heart: INITIAL_LIKES[a.slug] ?? 0 }] as const)
      )
    ).then((pairs) => setReactionCounts(Object.fromEntries(pairs)));

    Promise.all(
      articles.map((a) =>
        fetch(`/api/views/${encodeURIComponent(a.slug)}`)
          .then((r) => r.json())
          .then((data) => [a.slug, (data.views ?? 0) as number] as const)
          .catch(() => [a.slug, 0] as const)
      )
    ).then((pairs) => setViewCounts(Object.fromEntries(pairs)));
  }, [articles]);

  function handleListReaction(slug: string, type: string, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setReactionCounts((prev) => ({
      ...prev,
      [slug]: { ...(prev[slug] ?? {}), [type]: ((prev[slug] ?? {})[type] ?? 0) + 1 },
    }));
    fetch(`/api/reactions/${encodeURIComponent(slug)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.count === "number") {
          setReactionCounts((prev) => ({
            ...prev,
            [slug]: { ...(prev[slug] ?? {}), [type]: data.count },
          }));
        }
      })
      .catch(() => {
        setReactionCounts((prev) => ({
          ...prev,
          [slug]: {
            ...(prev[slug] ?? {}),
            [type]: Math.max(((prev[slug] ?? {})[type] ?? 1) - 1, 0),
          },
        }));
      });
  }

  const allTags = ["Founder-Led Content", "Thought Leadership", "Entrepreneurship", "Brand Strategy", "Strategy", "Filmmaking"];

  const filtered = activeTag
    ? articles.filter((a) => a.tags.includes(activeTag))
    : articles;

  // Sort by mode
  const totalReactions = (slug: string) =>
    Object.values(reactionCounts[slug] ?? {}).reduce((sum, n) => sum + n, 0);
  const sorted = sortMode === "popular"
    ? [...filtered].sort((a, b) => {
        const scoreA = totalReactions(a.slug) + (viewCounts[a.slug] ?? 0);
        const scoreB = totalReactions(b.slug) + (viewCounts[b.slug] ?? 0);
        return scoreB - scoreA;
      })
    : filtered; // already sorted by date from server

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function changePage(next: number) {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleTagChange(tag: string | null) {
    setActiveTag(tag);
    setPage(1);
  }

  function handleSortChange(mode: SortMode) {
    setSortMode(mode);
    setPage(1);
  }

  const sortBtnStyle = (active: boolean) => ({
    fontSize: "0.6875rem" as const,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    fontWeight: 600,
    padding: "0.4rem 1rem",
    border: "1px solid",
    borderColor: active ? "var(--gold)" : "rgba(200,194,180,0.2)",
    color: active ? "var(--gold)" : "var(--cream-dim)",
    backgroundColor: active ? "rgba(201,168,76,0.08)" : "transparent",
    cursor: "pointer" as const,
    transition: "all 0.2s ease",
  });

  return (
    <div style={{ backgroundColor: "var(--black)", minHeight: "100vh", paddingTop: "6rem" }}>
      {/* Header */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "5rem 2rem 4rem",
          borderBottom: "1px solid rgba(200,194,180,0.1)",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--gold)",
            fontWeight: 500,
            marginBottom: "1.5rem",
          }}
        >
          Thoughts
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            fontWeight: 700,
            lineHeight: 1.0,
            color: "var(--cream)",
            letterSpacing: "-0.025em",
            maxWidth: "16ch",
          }}
        >
          Thinking{" "}
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
            out loud.
          </em>
        </motion.h1>
      </div>

      {/* Filters + Sort */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease }}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2.5rem 2rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        {/* Tag filters */}
        <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
          <button onClick={() => handleTagChange(null)} style={sortBtnStyle(activeTag === null)}>
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagChange(activeTag === tag ? null : tag)}
              style={sortBtnStyle(activeTag === tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Sort toggle */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={() => handleSortChange("recent")} style={sortBtnStyle(sortMode === "recent")}>
            Recent
          </button>
          <button onClick={() => handleSortChange("popular")} style={sortBtnStyle(sortMode === "popular")}>
            Popular
          </button>
        </div>
      </motion.div>

      {/* Post list */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem 7rem" }}>
        <AnimatePresence mode="popLayout">
          {paginated.map(({ slug, category, date, readTime, title, excerpt }, i) => (
            <motion.div
              key={slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease }}
              layout
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "4rem 1fr auto",
                  gap: "2rem",
                  padding: "3.5rem 0",
                  borderBottom: "1px solid rgba(200,194,180,0.08)",
                  alignItems: "start",
                }}
              >
                {/* Number */}
                <div
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "0.75rem",
                    color: "var(--cream-dim)",
                    paddingTop: "0.25rem",
                    opacity: 0.5,
                  }}
                >
                  {String((page - 1) * PAGE_SIZE + i + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div>
                  <p
                    style={{
                      fontSize: "0.6875rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      fontWeight: 500,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {category}
                  </p>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--cream-dim)",
                      marginBottom: "0.875rem",
                      display: "flex",
                      gap: "0.75rem",
                      alignItems: "center",
                    }}
                  >
                    <span>{date.replace(/,.*$/, "")} · {readTime}</span>
                    {viewCounts[slug] > 0 && (
                      <span style={{ opacity: 0.6 }}>
                        · {viewCounts[slug].toLocaleString()} views
                      </span>
                    )}
                  </p>
                  <h2
                    style={{
                      fontFamily: "var(--font-display), Georgia, serif",
                      fontSize: "clamp(1.375rem, 3vw, 2rem)",
                      fontWeight: 600,
                      lineHeight: 1.15,
                      marginBottom: "1rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    <Link
                      href={`/writing/${slug}`}
                      style={{ color: "var(--cream)", textDecoration: "none" }}
                    >
                      {renderInlineTitle(title)}
                    </Link>
                  </h2>
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      color: "var(--cream-dim)",
                      lineHeight: 1.75,
                      marginBottom: "1.5rem",
                      maxWidth: "60ch",
                    }}
                  >
                    {excerpt}
                  </p>
                  {/* Reactions */}
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {([
                      { type: "heart", emoji: "♥", label: "Love" },
                      { type: "fire", emoji: "🔥", label: "Fire" },
                      { type: "lightbulb", emoji: "💡", label: "Insightful" },
                      { type: "accurate", emoji: "🎯", label: "Accurate" },
                    ] as const).map(({ type, emoji, label }) => (
                      <button
                        key={type}
                        onClick={(e) => handleListReaction(slug, type, e)}
                        aria-label={label}
                        title={label}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          padding: "0.4rem 0.75rem",
                          backgroundColor: "rgba(201,168,76,0.06)",
                          border: "1px solid rgba(201,168,76,0.25)",
                          color: "var(--gold)",
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          transition: "background-color 0.15s ease",
                          lineHeight: 1,
                        }}
                      >
                        <span style={{ fontSize: "0.9375rem" }}>{emoji}</span>
                        <span>{(reactionCounts[slug] ?? {})[type] ?? 0}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <Link
                  href={`/writing/${slug}`}
                  style={{
                    fontSize: "1.5rem",
                    color: "var(--gold)",
                    opacity: 0.6,
                    alignSelf: "center",
                    textDecoration: "none",
                  }}
                >
                  →
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "3rem",
              borderTop: "1px solid rgba(200,194,180,0.08)",
            }}
          >
            <button
              onClick={() => changePage(page - 1)}
              disabled={page === 1}
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 600,
                padding: "0.5rem 1.25rem",
                border: "1px solid",
                borderColor: page === 1 ? "rgba(200,194,180,0.1)" : "rgba(200,194,180,0.25)",
                color: page === 1 ? "rgba(200,194,180,0.25)" : "var(--cream-dim)",
                backgroundColor: "transparent",
                cursor: page === 1 ? "default" : "pointer",
                transition: "all 0.2s ease",
              }}
            >
              ← Prev
            </button>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => changePage(p)}
                  style={{
                    width: "2rem",
                    height: "2rem",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    border: "1px solid",
                    borderColor: p === page ? "var(--gold)" : "rgba(200,194,180,0.15)",
                    color: p === page ? "var(--gold)" : "var(--cream-dim)",
                    backgroundColor: p === page ? "rgba(201,168,76,0.08)" : "transparent",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={() => changePage(page + 1)}
              disabled={page === totalPages}
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 600,
                padding: "0.5rem 1.25rem",
                border: "1px solid",
                borderColor: page === totalPages ? "rgba(200,194,180,0.1)" : "rgba(200,194,180,0.25)",
                color: page === totalPages ? "rgba(200,194,180,0.25)" : "var(--cream-dim)",
                backgroundColor: "transparent",
                cursor: page === totalPages ? "default" : "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
