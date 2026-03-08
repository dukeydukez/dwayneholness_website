"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Article } from "@/lib/articles";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const PAGE_SIZE = 5;

export default function WritingList({ articles = [] }: { articles: Article[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const allTags = Array.from(new Set(articles.flatMap((a) => a.tags)));

  const filtered = activeTag
    ? articles.filter((a) => a.tags.includes(activeTag))
    : articles;

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function changePage(next: number) {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Reset to page 1 when tag changes
  function handleTagChange(tag: string | null) {
    setActiveTag(tag);
    setPage(1);
  }

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

      {/* Tag Filter */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease }}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2.5rem 2rem 0",
          display: "flex",
          gap: "0.625rem",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => handleTagChange(null)}
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 600,
            padding: "0.4rem 1rem",
            border: "1px solid",
            borderColor: activeTag === null ? "var(--gold)" : "rgba(200,194,180,0.2)",
            color: activeTag === null ? "var(--gold)" : "var(--cream-dim)",
            backgroundColor: activeTag === null ? "rgba(201,168,76,0.08)" : "transparent",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagChange(activeTag === tag ? null : tag)}
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 600,
              padding: "0.4rem 1rem",
              border: "1px solid",
              borderColor: activeTag === tag ? "var(--gold)" : "rgba(200,194,180,0.2)",
              color: activeTag === tag ? "var(--gold)" : "var(--cream-dim)",
              backgroundColor: activeTag === tag ? "rgba(201,168,76,0.08)" : "transparent",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {tag}
          </button>
        ))}
      </motion.div>

      {/* Post list */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem 7rem" }}>
        <AnimatePresence mode="popLayout">
          {paginated.map(({ slug, category, date, readTime, title, excerpt, tags }, i) => (
            <motion.div
              key={slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease }}
              layout
            >
              <Link
                href={`/writing/${slug}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "4rem 1fr auto",
                  gap: "2rem",
                  padding: "3.5rem 0",
                  borderBottom: "1px solid rgba(200,194,180,0.08)",
                  textDecoration: "none",
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
                    }}
                  >
                    {date} · {readTime}
                  </p>
                  <h2
                    style={{
                      fontFamily: "var(--font-display), Georgia, serif",
                      fontSize: "clamp(1.375rem, 3vw, 2rem)",
                      fontWeight: 600,
                      color: "var(--cream)",
                      lineHeight: 1.15,
                      marginBottom: "1rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {title}
                  </h2>
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      color: "var(--cream-dim)",
                      lineHeight: 1.75,
                      marginBottom: "1.25rem",
                      maxWidth: "60ch",
                    }}
                  >
                    {excerpt}
                  </p>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "0.6875rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: activeTag === tag ? "var(--gold)" : "var(--cream-dim)",
                          padding: "0.3rem 0.75rem",
                          border: "1px solid",
                          borderColor:
                            activeTag === tag
                              ? "rgba(201,168,76,0.4)"
                              : "rgba(200,194,180,0.15)",
                          backgroundColor:
                            activeTag === tag ? "rgba(201,168,76,0.06)" : "transparent",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div
                  style={{
                    fontSize: "1.5rem",
                    color: "var(--gold)",
                    opacity: 0.6,
                    alignSelf: "center",
                  }}
                >
                  →
                </div>
              </Link>
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
