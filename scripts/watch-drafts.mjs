#!/usr/bin/env node
/**
 * Drafts Watcher
 * Automatically generates articles when files are dropped into /drafts/
 *
 * Run: npm run watch
 * Keep this running in a terminal while you work.
 */

import fs from "fs";
import path from "path";
import { generateArticle, ROOT } from "./lib/generate.mjs";

const PROCESSING_DIR = path.join(ROOT, "content", "processing");
const PROCESSED_DIR = path.join(ROOT, "content", "processed");
const SUPPORTED = new Set([".txt", ".md", ".text", ".docx", ".pdf"]);

// Ensure folders exist
fs.mkdirSync(PROCESSING_DIR, { recursive: true });
fs.mkdirSync(PROCESSED_DIR, { recursive: true });

const processing = new Set();

async function handleFile(filename) {
  if (!filename || filename.startsWith(".")) return;
  const ext = path.extname(filename).toLowerCase();
  if (!SUPPORTED.has(ext)) return;

  const filePath = path.join(PROCESSING_DIR, filename);
  if (!fs.existsSync(filePath)) return;
  if (processing.has(filename)) return;

  processing.add(filename);

  console.log(`\n[drafts] Detected: ${filename}`);
  console.log("[drafts] Generating article...");

  try {
    // Small delay to ensure the file is fully written before reading
    await new Promise((r) => setTimeout(r, 800));

    const { finalPath, generated } = await generateArticle(filePath);
    const rel = path.relative(ROOT, finalPath);

    // Move draft to processed/
    const processedPath = path.join(PROCESSED_DIR, filename);
    fs.renameSync(filePath, processedPath);

    console.log(`[drafts] Article saved: ${rel}`);
    console.log("[drafts] Draft moved to: drafts/processed/");
    console.log("[drafts] Frontmatter:");
    console.log(generated.split("\n").slice(0, 9).join("\n"));
    console.log("\n[drafts] Commit + push to publish. Watching for next file...\n");
  } catch (err) {
    console.error(`[drafts] Error processing ${filename}:`, err.message);
  } finally {
    processing.delete(filename);
  }
}

// Watch the processing directory
fs.watch(PROCESSING_DIR, { persistent: true }, (eventType, filename) => {
  if (eventType === "rename") {
    handleFile(filename);
  }
});

console.log(`\n[drafts] Watching ${PROCESSING_DIR}`);
console.log("[drafts] Drop a .txt, .md, .docx, or .pdf file into content/processing/ to auto-generate an article.");
console.log("[drafts] Press Ctrl+C to stop.\n");
