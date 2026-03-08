"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: "01",
    slug: "creative-connect",
    title: "Creative Connect",
    category: "Podcast",
    year: "2024",
    client: "Corex Creative",
    description:
      "A podcast platform dedicated to shining a light on the often overlooked stars of the creative world. Artists, filmmakers, musicians, and designers step out from behind the scenes and into the spotlight.",
    tags: ["Podcast", "Community", "Creative Industries"],
  },
  {
    id: "02",
    slug: "hodans-story",
    title: "Hodan's Story",
    category: "Documentary",
    year: "2023",
    client: "CBC Short Docs",
    description:
      "A short documentary following Somali-Canadian journalist and activist Hodan Nalayeh as she returns to Somalia 25 years after fleeing, on a mission to spread light where many only see darkness.",
    tags: ["Documentary", "CBC", "Human Interest"],
  },
  {
    id: "03",
    slug: "lcbo-spirit-of-sustainability",
    title: "LCBO – Spirit of Sustainability",
    category: "Brand Film Series",
    year: "2021",
    client: "LCBO",
    description:
      "A three-part brand film series for LCBO exploring their commitment to environmental sustainability through story rather than statement.",
    tags: ["Brand Film", "Corporate", "Sustainability"],
  },
  {
    id: "04",
    slug: "historica-canada-the-blackburns",
    title: "Historica Canada – The Blackburns",
    category: "Heritage Film",
    year: "2020",
    client: "Historica Canada",
    description:
      "A heritage documentary short telling the story of Thornton and Lucie Blackburn, freedom seekers who escaped enslavement and became Toronto's first Black cab operators.",
    tags: ["Heritage Film", "Documentary", "Black Canadian History"],
  },
];

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const PAGE_SIZE = 3;

export default function WorkPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function changePage(next: number) {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleTagChange(tag: string | null) {
    setActiveTag(tag);
    setPage(1);
  }

  return (
    <div style={{ backgroundColor: "var(--black)", minHeight: "100vh", paddingTop: "6rem" }}>
      {/* Page Header */}
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
          Selected Work
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            fontWeight: 700,
            lineHeight: 1.0,
            color: "var(--cream)",
            letterSpacing: "-0.025em",
            maxWidth: "16ch",
          }}
        >
          Work that{" "}
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>endures</em>.
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

      {/* Project List */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem 7rem" }}>
        <AnimatePresence mode="popLayout">
          {paginated.map(({ id, slug, title, category, year, client, description, tags }, i) => (
            <motion.div
              key={slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease }}
              layout
            >
              <Link href={`/work/${slug}`} style={{ textDecoration: "none", display: "block" }}>
                <motion.div
                  whileHover={{ x: 6, backgroundColor: "rgba(201,168,76,0.03)" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "4rem 1fr auto",
                    gap: "2.5rem",
                    padding: "3.5rem 1rem 3.5rem 0",
                    borderBottom: "1px solid rgba(200,194,180,0.08)",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ paddingTop: "0.35rem" }}>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--gold)",
                        letterSpacing: "0.08em",
                        fontWeight: 500,
                      }}
                    >
                      {id}
                    </span>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        gap: "1.5rem",
                        marginBottom: "0.875rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.6875rem",
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: "var(--gold)",
                          fontWeight: 500,
                        }}
                      >
                        {category}
                      </span>
                      <span
                        style={{
                          fontSize: "0.6875rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--cream-dim)",
                        }}
                      >
                        {client} · {year}
                      </span>
                    </div>
                    <h2
                      style={{
                        fontFamily: "var(--font-display), sans-serif",
                        fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                        fontWeight: 600,
                        color: "var(--cream)",
                        lineHeight: 1.1,
                        marginBottom: "1rem",
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {title}
                    </h2>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "var(--cream-dim)",
                        lineHeight: 1.75,
                        maxWidth: "64ch",
                        marginBottom: "1.25rem",
                      }}
                    >
                      {description}
                    </p>
                    <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
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
                  <span
                    style={{
                      color: "var(--gold)",
                      fontSize: "1.5rem",
                      fontWeight: 300,
                      flexShrink: 0,
                      opacity: 0.6,
                    }}
                  >
                    →
                  </span>
                </motion.div>
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
