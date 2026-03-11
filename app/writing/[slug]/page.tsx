import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug, parseMarkdownToBlocks } from "@/lib/articles";
import type { ContentBlock } from "@/lib/articles";
import ReactionBar from "@/components/ReactionBar";
import ViewCounter from "@/components/ViewCounter";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import ReadingProgress from "@/components/ReadingProgress";
import ShareButtons from "@/components/ShareButtons";
import NewsletterSignup from "@/components/NewsletterSignup";
import HighlightShare from "@/components/HighlightShare";

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
    title: `${article.title.replace(/\*/g, "")} | Dwayne Holness`,
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

  // Auto-compute adjacent articles from the sorted list
  const allArticles = getAllArticles();
  const idx = allArticles.findIndex((a) => a.slug === slug);
  const prevArticle = idx > 0 ? allArticles[idx - 1] : null;
  const nextArticle = idx < allArticles.length - 1 ? allArticles[idx + 1] : null;

  const { date, readTime, title, excerpt: subtitle, tags, content: rawContent } = article;
  const content: ContentBlock[] = parseMarkdownToBlocks(rawContent);

  return (
    <div style={{ backgroundColor: "var(--black)", minHeight: "100vh", paddingTop: "6rem" }}>
      <ReadingProgressBar />
      <HighlightShare />
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
          <span style={{ fontSize: "0.8125rem", color: "var(--cream-dim)" }}>{date}</span>
          <span style={{ color: "rgba(200,194,180,0.3)", fontSize: "0.8125rem" }}>·</span>
          <ReadingProgress readTime={readTime} />
          <span style={{ color: "rgba(200,194,180,0.3)", fontSize: "0.8125rem" }}>·</span>
          <ViewCounter slug={slug} />
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {tags.slice(0, 2).map((tag) => (
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
          {renderInlineTitle(title)}
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
          padding: "5rem 2rem 4rem",
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
                  src={(block as { type: "image"; text: string; src?: string }).src}
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
          if (block.type === "callout") {
            const cb = block as { type: "callout"; label: string; text: string };
            return (
              <div
                key={i}
                style={{
                  margin: "2.5rem 0",
                  padding: "1.5rem 2rem",
                  backgroundColor: "rgba(201,168,76,0.06)",
                  borderLeft: "3px solid var(--gold)",
                }}
              >
                <p
                  style={{
                    fontSize: "0.625rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    fontWeight: 700,
                    marginBottom: "0.625rem",
                  }}
                >
                  {cb.label}
                </p>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "var(--cream)",
                    lineHeight: 1.75,
                    fontStyle: "italic",
                    margin: 0,
                  }}
                >
                  {cb.text}
                </p>
              </div>
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
              {(block as { type: "p"; text: string }).text}
            </p>
          );
        })}

        {/* Author bio */}
        <div
          style={{
            marginTop: "4rem",
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

        {/* Reactions */}
        <ReactionBar slug={slug} />

        {/* Share */}
        <ShareButtons title={title} slug={slug} />

        {/* Newsletter */}
        <NewsletterSignup />
      </div>

      {/* Article navigation — Previous & Next */}
      {(prevArticle || nextArticle) && (
        <div
          style={{
            borderTop: "1px solid rgba(200,194,180,0.1)",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "4rem 2rem",
            display: "grid",
            gridTemplateColumns: prevArticle && nextArticle ? "1fr 1fr" : "1fr",
            gap: "3rem",
          }}
        >
          {prevArticle && (
            <div>
              <p
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--cream-dim)",
                  marginBottom: "0.875rem",
                }}
              >
                ← Previous Thought
              </p>
              <Link
                href={`/writing/${prevArticle.slug}`}
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "clamp(1.125rem, 2.5vw, 1.625rem)",
                  fontWeight: 700,
                  color: "var(--cream)",
                  textDecoration: "none",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.2,
                  display: "block",
                }}
              >
                {prevArticle.title.replace(/\*/g, "")}
              </Link>
            </div>
          )}
          {nextArticle && (
            <div style={{ textAlign: prevArticle ? "right" : "left" }}>
              <p
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--cream-dim)",
                  marginBottom: "0.875rem",
                }}
              >
                Next Thought →
              </p>
              <Link
                href={`/writing/${nextArticle.slug}`}
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "clamp(1.125rem, 2.5vw, 1.625rem)",
                  fontWeight: 700,
                  color: "var(--cream)",
                  textDecoration: "none",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.2,
                  display: "block",
                }}
              >
                {nextArticle.title.replace(/\*/g, "")}
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
