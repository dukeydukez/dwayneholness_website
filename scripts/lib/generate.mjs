import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Anthropic from "@anthropic-ai/sdk";
import mammoth from "mammoth";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, "../..");

// Load .env.local once
const envPath = path.join(ROOT, ".env.local");
if (fs.existsSync(envPath)) {
  const env = fs.readFileSync(envPath, "utf8");
  for (const line of env.split("\n")) {
    const match = line.match(/^([^#=\s][^=]*)=(.*)$/);
    if (match) {
      const [, key, val] = match;
      if (!process.env[key]) process.env[key] = val.replace(/^["']|["']$/g, "");
    }
  }
}

const SYSTEM_PROMPT = `You are a writing editor for Dwayne Holness, founder of Corex Creative Inc. — a Toronto-based cinematic brand storytelling agency with $2M+ revenue.

Dwayne writes for founders, creatives, and thought leaders. His voice is:
- Confident and direct, not preachy or motivational-poster
- Grounded in real experience and specific observations
- Cinematic: he thinks in frames, sequences, and stories
- Conversational but high-craft — like a smart founder talking to a peer
- No corporate buzzwords, no vague language, no hollow hooks

Use Canadian English spelling: colour, favourite, honour. Use -ize endings (organize, recognize, prioritize). No em dashes (—) — use commas, colons, or periods instead.

You will receive raw notes, a rough draft, or a brain dump. Your job is to:
1. Distill the core insight or story
2. Write a polished article in Dwayne's voice
3. Return ONLY valid frontmatter + article body — no commentary, no preamble

FRONTMATTER FORMAT (YAML, between triple dashes):
---
title: "Article Title"
date: "Month YYYY"
readTime: "X min read"
category: "One of: Filmmaking | Brand Strategy | Entrepreneurship | Leadership | Creative Direction"
tags: ["Tag1", "Tag2", "Tag3"]
excerpt: "One or two sentence hook shown on the listing page."
---

BODY FORMAT — use only these markdown elements:
- Regular paragraphs (most of the article)
- ## Section Heading (for major shifts in the piece)
- > Pull quote text (for the single most powerful line — use sparingly, max 2)

LENGTH: 500–900 words in the body. Tight. No filler.

IMPORTANT: Return ONLY the frontmatter + body. Nothing else.`;

export async function generateArticle(inputPath) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set. Add it to .env.local.");

  const ext = path.extname(inputPath).toLowerCase();
  let rawContent;
  if (ext === ".docx") {
    const { value } = await mammoth.extractRawText({ path: inputPath });
    rawContent = value;
  } else {
    rawContent = fs.readFileSync(inputPath, "utf8");
  }
  const client = new Anthropic({ apiKey });

  const today = new Date();
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const h = today.getHours();
  const min = String(today.getMinutes()).padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  const currentDate = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}, ${hour12}:${min} ${ampm}`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    system: SYSTEM_PROMPT.replace("Month YYYY", currentDate),
    messages: [
      {
        role: "user",
        content: `Here are my raw notes / draft. Turn this into a polished article:\n\n---\n${rawContent}\n---`,
      },
    ],
  });

  const generated = message.content[0].text.trim();

  // Build slug from title
  const titleMatch = generated.match(/^title:\s*["']?(.+?)["']?\s*$/m);
  const rawTitle = titleMatch ? titleMatch[1] : `article-${Date.now()}`;
  const slug = rawTitle
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);

  const outputPath = path.join(ROOT, "content", "writing", `${slug}.md`);
  const finalPath = fs.existsSync(outputPath)
    ? path.join(ROOT, "content", "writing", `${slug}-${Date.now()}.md`)
    : outputPath;

  fs.writeFileSync(finalPath, generated, "utf8");
  return { finalPath, slug, generated };
}
