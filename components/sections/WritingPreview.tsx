"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Article } from "@/lib/articles";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function WritingPreview({ posts = [] }: { posts: Pick<Article, "slug" | "date" | "title" | "excerpt">[] }) {
  return (
    <section
      style={{
        backgroundColor: "var(--black)",
        padding: "7rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "4rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--gold)",
                fontWeight: 500,
                marginBottom: "1rem",
              }}
            >
              Thoughts
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: "var(--cream)",
                letterSpacing: "-0.02em",
              }}
            >
              Thinking out loud.
            </h2>
          </div>
          <Link
            href="/writing"
            style={{
              fontSize: "0.8125rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--gold)",
              textDecoration: "none",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            All Thoughts <span aria-hidden>→</span>
          </Link>
        </motion.div>

        {/* Post grid — no inline gridTemplateColumns so md:grid-cols-3 class takes effect */}
        <div
          style={{ display: "grid", gap: "2rem" }}
          className="md:grid-cols-3"
        >
          {posts.map(({ slug, date, title, excerpt }, i) => (
            <motion.div
              key={slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease }}
              whileHover={{
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 22 },
              }}
            >
              <Link
                href={`/writing/${slug}`}
                style={{
                  display: "block",
                  height: "100%",
                  padding: "2rem",
                  backgroundColor: "var(--charcoal)",
                  borderTop: "2px solid rgba(201,168,76,0.3)",
                  textDecoration: "none",
                  transition: "border-color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderTopColor =
                    "var(--gold)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderTopColor =
                    "rgba(201,168,76,0.3)")
                }
              >
                <p
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: "1rem",
                  }}
                >
                  {date}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "1.375rem",
                    fontWeight: 600,
                    color: "var(--cream)",
                    lineHeight: 1.25,
                    marginBottom: "1rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--cream-dim)",
                    lineHeight: 1.7,
                  }}
                >
                  {excerpt}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
