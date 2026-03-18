import puppeteer from "puppeteer";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

// Load photo as base64
const photoPath = path.join(projectRoot, "public/images/DH1.png");
const photoBase64 = readFileSync(photoPath).toString("base64");
const photoSrc = `data:image/png;base64,${photoBase64}`;

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  body {
    width: 1200px;
    height: 630px;
    overflow: hidden;
    background: #111111;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    display: flex;
    align-items: stretch;
  }
  .gold-bar {
    width: 6px;
    background: #c9a84c;
    flex-shrink: 0;
  }
  .photo-col {
    width: 380px;
    flex-shrink: 0;
    overflow: hidden;
    position: relative;
  }
  .photo-col img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }
  .photo-col::after {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0;
    width: 60px;
    background: linear-gradient(to right, transparent, #111111);
  }
  .text-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px 70px 60px 50px;
    gap: 18px;
  }
  .eyebrow {
    font-size: 13px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #c9a84c;
    font-weight: 500;
  }
  .name {
    font-size: 56px;
    font-weight: 700;
    color: #f0ebe0;
    line-height: 1.05;
    letter-spacing: -0.02em;
  }
  .title {
    font-size: 22px;
    color: #c9a84c;
    font-weight: 500;
    line-height: 1.3;
  }
  .divider {
    width: 48px;
    height: 1px;
    background: rgba(201, 168, 76, 0.4);
  }
  .tagline {
    font-size: 17px;
    color: #c8c2b4;
    line-height: 1.65;
    max-width: 380px;
  }
</style>
</head>
<body>
  <div class="gold-bar"></div>
  <div class="photo-col">
    <img src="${photoSrc}" />
  </div>
  <div class="text-col">
    <div class="eyebrow">dwayneholness.com</div>
    <div class="name">Dwayne<br>Holness</div>
    <div class="title">Speaker · Brand Architect<br>· Strategist</div>
    <div class="divider"></div>
    <div class="tagline">Helping founders and enterprise brands build media systems that compound authority over time.</div>
  </div>
</body>
</html>`;

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "networkidle0" });

const outputPath = path.join(projectRoot, "public/images/og-image.png");
await page.screenshot({ path: outputPath, type: "png" });
await browser.close();

console.log(`OG image saved to ${outputPath}`);
