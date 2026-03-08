import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug, parseMarkdownToBlocks } from "@/lib/articles";


export async function generateStaticParams() {
  return getAllArticles().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | Dwayne Holness`,
    description: article.excerpt,
  };
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const { date, readTime, title, excerpt: subtitle, tags, content: rawContent, nextSlug, nextTitle } = article;
  const content = parseMarkdownToBlocks(rawContent);

  return (
    <div style={{ backgroundColor: "var(--black)", minHeight: "100vh", paddingTop: "6rem" }}>
      {/* Header */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "5rem 2rem 5rem",
          borderBottom: "1px solid rgba(200,194,180,0.1)",
        }}
      >
        <Link
          href="/writing"
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--cream-dim)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "3rem",
          }}
        >
          ← All Writing
        </Link>

        <div
          style={{
            display: "flex",
            gap: "2rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "0.8125rem", color: "var(--cream-dim)" }}>{date}</p>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--gold)",
            }}
          >
            {readTime}
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--cream-dim)",
                  padding: "0.25rem 0.625rem",
                  border: "1px solid rgba(200,194,180,0.15)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "var(--cream)",
            letterSpacing: "-0.025em",
            maxWidth: "24ch",
            marginBottom: "1.75rem",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: "var(--cream-dim)",
            lineHeight: 1.7,
            maxWidth: "60ch",
            fontStyle: "italic",
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Article body */}
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "5rem 2rem 7rem",
        }}
      >
        {content.map((block, i) => {
          if (block.type === "h2") {
            return (
              <h2
                key={i}
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
                  fontWeight: 700,
                  color: "var(--cream)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  marginTop: "3.5rem",
                  marginBottom: "1.25rem",
                }}
              >
                {block.text}
              </h2>
            );
          }
          if (block.type === "image") {
            return (
              <div key={i} style={{ margin: "3rem 0" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={block.src}
                  alt={block.text}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                {block.text && (
                  <p style={{ fontSize: "0.75rem", color: "var(--cream-dim)", marginTop: "0.75rem", opacity: 0.6, letterSpacing: "0.08em" }}>
                    {block.text}
                  </p>
                )}
              </div>
            );
          }
          if (block.type === "blockquote") {
            return (
              <blockquote
                key={i}
                style={{
                  borderLeft: "3px solid var(--gold)",
                  paddingLeft: "2rem",
                  margin: "3rem 0",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontSize: "1.25rem",
                    color: "var(--cream)",
                    lineHeight: 1.5,
                    fontStyle: "italic",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {block.text}
                </p>
              </blockquote>
            );
          }
          return (
            <p
              key={i}
              style={{
                fontSize: "1.0625rem",
                color: "var(--cream-dim)",
                lineHeight: 1.85,
                marginBottom: "1.75rem",
              }}
            >
              {block.text}
            </p>
          );
        })}

        {/* Author bio */}
        <div
          style={{
            marginTop: "5rem",
            paddingTop: "3rem",
            borderTop: "1px solid rgba(200,194,180,0.1)",
            display: "flex",
            gap: "2rem",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                fontWeight: 500,
                marginBottom: "0.625rem",
              }}
            >
              Written by
            </p>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--cream)",
                fontWeight: 600,
                marginBottom: "0.5rem",
              }}
            >
              Dwayne Holness
            </p>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--cream-dim)",
                lineHeight: 1.6,
                maxWidth: "48ch",
              }}
            >
              Filmmaker, brand strategist, and creative director. Founder of Corex Creative, a Toronto-based creative media agency building cinematic brand stories for founders and thought leaders.
            </p>
          </div>
        </div>
      </div>

      {/* Next article */}
      <div
        style={{
          borderTop: "1px solid rgba(200,194,180,0.1)",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "4rem 2rem",
        }}
      >
        <p
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--cream-dim)",
            marginBottom: "1rem",
          }}
        >
          Next Essay
        </p>
        <Link
          href={`/writing/${nextSlug}`}
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
            fontWeight: 700,
            color: "var(--cream)",
            textDecoration: "none",
            letterSpacing: "-0.015em",
            display: "inline-flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {nextTitle} <span style={{ color: "var(--gold)" }}>→</span>
        </Link>
      </div>
    </div>
  );
}
