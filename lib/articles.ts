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

export function getAllArticles(): Article[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md") && f !== "README.md");

  const articles = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    return { slug, content, ...(data as ArticleFrontmatter) };
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

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { slug, content, ...(data as ArticleFrontmatter) };
}

export function parseMarkdownToBlocks(
  markdown: string
): { type: "p" | "h2" | "blockquote" | "image"; text: string; src?: string }[] {
  const lines = markdown.split("\n");
  const blocks: { type: "p" | "h2" | "blockquote" | "image"; text: string; src?: string }[] = [];
  let paragraph = "";

  for (const line of lines) {
    const trimmed = line.trim();
    const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);

    if (trimmed.startsWith("## ")) {
      if (paragraph) { blocks.push({ type: "p", text: paragraph.trim() }); paragraph = ""; }
      blocks.push({ type: "h2", text: trimmed.slice(3) });
    } else if (trimmed.startsWith("> ")) {
      if (paragraph) { blocks.push({ type: "p", text: paragraph.trim() }); paragraph = ""; }
      blocks.push({ type: "blockquote", text: trimmed.slice(2) });
    } else if (imageMatch) {
      if (paragraph) { blocks.push({ type: "p", text: paragraph.trim() }); paragraph = ""; }
      blocks.push({ type: "image", text: imageMatch[1], src: imageMatch[2] });
    } else if (trimmed === "") {
      if (paragraph) { blocks.push({ type: "p", text: paragraph.trim() }); paragraph = ""; }
    } else {
      paragraph += (paragraph ? " " : "") + trimmed;
    }
  }

  if (paragraph) blocks.push({ type: "p", text: paragraph.trim() });
  return blocks;
}
