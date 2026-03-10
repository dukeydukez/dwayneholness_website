import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/writing");

export type ArticleFrontmatter = {
  title: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  excerpt: string;
  nextSlug?: string;
  nextTitle?: string;
};

export type Article = ArticleFrontmatter & {
  slug: string;
  content: string;
};

const REQUIRED_FIELDS = ["title", "date", "readTime", "category", "tags", "excerpt"] as const;

function validateFrontmatter(data: unknown, slug: string): ArticleFrontmatter {
  const d = data as Record<string, unknown>;
  for (const field of REQUIRED_FIELDS) {
    if (d[field] === undefined || d[field] === null || d[field] === "") {
      throw new Error(`Article "${slug}" is missing required frontmatter field: "${field}"`);
    }
  }
  if (!Array.isArray(d.tags)) {
    throw new Error(`Article "${slug}" has invalid "tags" — expected an array`);
  }
  return d as unknown as ArticleFrontmatter;
}

export function getAllArticles(): Article[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md") && f !== "README.md");

  const articles = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    return { slug, content, ...validateFrontmatter(data, slug) };
  });

  // Sort by date descending (most recent first)
  // Supports "Month YYYY" and "D Month YYYY" (Canadian format) — new Date() can't parse these in V8
  const MONTHS: Record<string, number> = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
  };
  function parseArticleDate(d: string): number {
    // Strip optional time portion: "8 March 2026, 6:00 PM" → "8 March 2026"
    const datePart = d.replace(/,.*$/, "").trim();
    const timePart = d.includes(",") ? d.slice(d.indexOf(",") + 1).trim() : null;
    const parts = datePart.split(/\s+/);
    let day = 1, month: string, year: string;
    if (parts.length === 3) {
      [day, month, year] = [parseInt(parts[0], 10), parts[1], parts[2]];
    } else {
      [month, year] = parts;
    }
    const m = MONTHS[month?.toLowerCase()];
    const y = parseInt(year, 10);
    if (m === undefined || isNaN(y)) return 0;
    const base = new Date(y, m, day);
    if (timePart) {
      const tMatch = timePart.match(/(\d+):(\d+)\s*(AM|PM)?/i);
      if (tMatch) {
        let h = parseInt(tMatch[1], 10);
        const min = parseInt(tMatch[2], 10);
        const ampm = tMatch[3]?.toUpperCase();
        if (ampm === "PM" && h < 12) h += 12;
        if (ampm === "AM" && h === 12) h = 0;
        base.setHours(h, min);
      }
    }
    return base.getTime();
  }
  return articles.sort((a, b) => parseArticleDate(b.date) - parseArticleDate(a.date));
}

const SAFE_SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function getArticleBySlug(slug: string): Article | null {
  if (!SAFE_SLUG_RE.test(slug)) return null;
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  // Guard against path traversal — resolved path must stay inside CONTENT_DIR
  if (!filePath.startsWith(CONTENT_DIR + path.sep)) return null;
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { slug, content, ...validateFrontmatter(data, slug) };
}

export type ContentBlock =
  | { type: "p" | "h2" | "blockquote"; text: string }
  | { type: "image"; text: string; src?: string }
  | { type: "callout"; label: string; text: string }
  | { type: "hr" };

export function parseMarkdownToBlocks(markdown: string): ContentBlock[] {
  const lines = markdown.split("\n");
  const blocks: ContentBlock[] = [];
  let paragraph = "";

  const flush = () => {
    if (paragraph) { blocks.push({ type: "p", text: paragraph.trim() }); paragraph = ""; }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    // Detect callouts: **Label:** body (e.g. "The action:", "Who you are building for:")
    const calloutMatch = trimmed.match(/^\*\*([^:*]+):\*\*\s*(.+)$/);

    if (trimmed.startsWith("## ")) {
      flush();
      blocks.push({ type: "h2", text: trimmed.slice(3) });
    } else if (trimmed.startsWith("> ")) {
      flush();
      blocks.push({ type: "blockquote", text: trimmed.slice(2) });
    } else if (imageMatch) {
      flush();
      const rawSrc = imageMatch[2];
      const safeSrc = /^https?:\/\/|^\//.test(rawSrc) ? rawSrc : undefined;
      blocks.push({ type: "image", text: imageMatch[1], src: safeSrc });
    } else if (trimmed === "---") {
      // Section dividers: flush paragraph but skip rendering
      flush();
    } else if (calloutMatch) {
      flush();
      blocks.push({ type: "callout", label: calloutMatch[1], text: calloutMatch[2] });
    } else if (trimmed === "") {
      flush();
    } else {
      paragraph += (paragraph ? " " : "") + trimmed;
    }
  }

  flush();
  return blocks;
}
