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
  return articles.sort((a, b) => {
    const dateA = new Date(a.date).getTime() || 0;
    const dateB = new Date(b.date).getTime() || 0;
    return dateB - dateA;
  });
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
): { type: "p" | "h2" | "blockquote"; text: string }[] {
  const lines = markdown.split("\n");
  const blocks: { type: "p" | "h2" | "blockquote"; text: string }[] = [];
  let paragraph = "";

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("## ")) {
      if (paragraph) { blocks.push({ type: "p", text: paragraph.trim() }); paragraph = ""; }
      blocks.push({ type: "h2", text: trimmed.slice(3) });
    } else if (trimmed.startsWith("> ")) {
      if (paragraph) { blocks.push({ type: "p", text: paragraph.trim() }); paragraph = ""; }
      blocks.push({ type: "blockquote", text: trimmed.slice(2) });
    } else if (trimmed === "") {
      if (paragraph) { blocks.push({ type: "p", text: paragraph.trim() }); paragraph = ""; }
    } else {
      paragraph += (paragraph ? " " : "") + trimmed;
    }
  }

  if (paragraph) blocks.push({ type: "p", text: paragraph.trim() });
  return blocks;
}
