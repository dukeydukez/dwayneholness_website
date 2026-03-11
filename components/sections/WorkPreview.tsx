"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const projects = [
  {
    id: "01",
    slug: "hodans-story",
    title: "Hodan's Story",
    category: "Documentary · CBC Short Docs",
    description:
      "A short documentary following Somali-Canadian journalist Hodan Nalayeh as she returns to Somalia, on a mission to spread light where many only see darkness.",
  },
  {
    id: "02",
    slug: "historica-canada-the-blackburns",
    title: "Historica Canada – The Blackburns",
    category: "Heritage Film · Documentary",
    description:
      "A heritage documentary short telling the story of Thornton and Lucie Blackburn, freedom seekers who became Toronto's first Black cab operators.",
  },
  {
    id: "03",
    slug: "lcbo-spirit-of-sustainability",
    title: "LCBO – Spirit of Sustainability",
    category: "Brand Film Series · Corporate",
    description:
      "A three-part brand film series for LCBO exploring their commitment to environmental sustainability through story rather than statement.",
  },
];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function WorkPreview() {
  return (
    <section
      id="selected-work"
      style={{
        backgroundColor: "var(--black)",
        padding: "7rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
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
              Selected Work
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display), sans-serif",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: "var(--cream)",
                letterSpacing: "-0.02em",
              }}
            >
              Stories built to last.
            </h2>
          </div>
          <Link
            href="/work"
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
            All Work <span aria-hidden>→</span>
          </Link>
        </motion.div>

        {/* Project list */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {projects.map(({ id, slug, title, category, description }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease }}
            >
              <Link
                href={`/work/${slug}`}
                style={{ textDecoration: "none", display: "block" }}
              >
                <motion.div
                  whileHover={{ x: 8, backgroundColor: "rgba(201,168,76,0.03)" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3rem 1fr auto",
                    gap: "2rem",
                    padding: "2.5rem 1rem 2.5rem 0",
                    borderTop:
                      i === 0
                        ? "1px solid rgba(200,194,180,0.15)"
                        : "1px solid rgba(200,194,180,0.08)",
                    borderBottom:
                      i === projects.length - 1
                        ? "1px solid rgba(200,194,180,0.15)"
                        : "none",
                    cursor: "pointer",
                    alignItems: "center",
                  }}
                >
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
                  <div>
                    <p
                      style={{
                        fontSize: "0.6875rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "var(--cream-dim)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {category}
                    </p>
                    <h3
                      style={{
                        fontFamily: "var(--font-display), sans-serif",
                        fontSize: "clamp(1.375rem, 3vw, 2rem)",
                        fontWeight: 600,
                        color: "var(--cream)",
                        marginBottom: "0.75rem",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.9375rem",
                        color: "var(--cream-dim)",
                        lineHeight: 1.6,
                        maxWidth: "60ch",
                      }}
                    >
                      {description}
                    </p>
                  </div>
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{
                      color: "var(--gold)",
                      fontSize: "1.25rem",
                      fontWeight: 300,
                      flexShrink: 0,
                    }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
