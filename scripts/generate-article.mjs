#!/usr/bin/env node
/**
 * Article Generator (CLI)
 * npm run article drafts/your-file.txt
 */

import path from "path";
import { generateArticle, ROOT } from "./lib/generate.mjs";

const inputArg = process.argv[2];
if (!inputArg) {
  console.error("Usage: npm run article drafts/your-file.txt");
  process.exit(1);
}

const inputPath = path.resolve(ROOT, inputArg);

console.log(`\nGenerating article from: ${inputArg}`);
console.log("Calling Claude...\n");

try {
  const { finalPath, generated } = await generateArticle(inputPath);
  const rel = path.relative(ROOT, finalPath);
  console.log(`Article saved to: ${rel}`);
  console.log("\nFrontmatter preview:");
  console.log(generated.split("\n").slice(0, 10).join("\n"));
  console.log("\nDone. Review, then commit + push to publish.");
} catch (err) {
  console.error("Error:", err.message);
  process.exit(1);
}
