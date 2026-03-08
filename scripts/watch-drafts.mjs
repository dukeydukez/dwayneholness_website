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

const DRAFTS_DIR = path.join(ROOT, "drafts");
const PROCESSED_DIR = path.join(ROOT, "drafts", "processed");
const SUPPORTED = new Set([".txt", ".md", ".text", ".docx"]);

// Ensure processed/ folder exists
fs.mkdirSync(PROCESSED_DIR, { recursive: true });

const processing = new Set();

async function handleFile(filename) {
  if (!filename || filename.startsWith(".")) return;
  const ext = path.extname(filename).toLowerCase();
  if (!SUPPORTED.has(ext)) return;

  const filePath = path.join(DRAFTS_DIR, filename);
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

// Watch the drafts directory
fs.watch(DRAFTS_DIR, { persistent: true }, (eventType, filename) => {
  if (eventType === "rename") {
    handleFile(filename);
  }
});

console.log(`\n[drafts] Watching ${DRAFTS_DIR}`);
console.log("[drafts] Drop a .txt, .md, or .docx file into drafts/ to auto-generate an article.");
console.log("[drafts] Press Ctrl+C to stop.\n");
