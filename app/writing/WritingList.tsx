"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const posts = [
  {
    id: "01",
    slug: "why-most-brand-films-fail",
    category: "Filmmaking",
    date: "February 2026",
    readTime: "6 min read",
    title: "Why Most Brand Films Fail Before They're Shot",
    excerpt:
      "Great brand filmmaking starts long before the camera turns on. It starts with clarity about what you're actually trying to say — and most brands never get there.",
    tags: ["Filmmaking", "Brand Strategy"],
  },
  {
    id: "02",
    slug: "founder-led-content",
    category: "Content Strategy",
    date: "January 2026",
    readTime: "8 min read",
    title: "The Case for Founder-Led Content in 2026",
    excerpt:
      "Audiences are exhausted by polished corporate content. The founders who win in 2026 are the ones willing to be specific, human, and real — and the ones building a content system around that.",
    tags: ["Content Strategy", "Founder Brand"],
  },
  {
    id: "03",
    slug: "cinematic-positioning",
    category: "Brand Strategy",
    date: "December 2025",
    readTime: "7 min read",
    title: "Cinematic Positioning: How Visual Language Builds Brands",
    excerpt:
      "Positioning isn't just messaging. The visual vocabulary you choose communicates who you are before you say a word. Here's how to think about it strategically.",
    tags: ["Brand Strategy", "Visual Identity"],
  },
  {
    id: "04",
    slug: "authority-without-audience",
    category: "Authority Building",
    date: "November 2025",
    readTime: "5 min read",
    title: "How to Build Authority Without a Mass Audience",
    excerpt:
      "You don't need a million followers to be the most trusted voice in your category. You need precision, consistency, and a clear point of view.",
    tags: ["Authority Building", "Strategy"],
  },
  {
    id: "05",
    slug: "documentary-mindset",
    category: "Filmmaking",
    date: "October 2025",
    readTime: "9 min read",
    title: "The Documentary Mindset: What Every Brand Could Learn",
    excerpt:
      "Documentarians don't make up stories — they find them. The best brand filmmakers I know operate the same way. Here's what that looks like in practice.",
    tags: ["Filmmaking", "Brand Story"],
  },
];

const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function WritingList() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

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
          onClick={() => setActiveTag(null)}
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
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
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
          {filtered.map(({ id, slug, category, date, readTime, title, excerpt, tags }, i) => (
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
                  {id}
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
      </div>
    </div>
  );
}
