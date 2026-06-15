/**
 * optimize-frames.mjs
 *
 * Re-encodes public/profilepic/*.webp files at a smaller resolution and lower
 * quality so they load near-instantly in the browser while remaining visually
 * sharp at the 240 px display size (≤ 480 px = 2× retina).
 *
 * Usage:  node scripts/optimize-frames.mjs
 */

import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRAMES_DIR = path.resolve(__dirname, "..", "public", "profilepic");

// ── Config ────────────────────────────────────────────────────────────────────
const TARGET_WIDTH = 480;   // px — 2× the largest display size (240 px)
const WEBP_QUALITY = 72;    // 0-100 — sweet-spot: visually lossless at this size
const COMPRESSION  = 5;     // 0-6 — higher = smaller file, slightly slower encode

// ─────────────────────────────────────────────────────────────────────────────

const files = fs
  .readdirSync(FRAMES_DIR)
  .filter((f) => f.endsWith(".webp"))
  .sort();

if (files.length === 0) {
  console.error(`❌  No .webp files found in ${FRAMES_DIR}`);
  process.exit(1);
}

console.log(`🗜️   Optimizing ${files.length} frames → ${TARGET_WIDTH}px wide, q${WEBP_QUALITY}\n`);

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const fullPath = path.join(FRAMES_DIR, file);
  const tmpPath  = fullPath + ".tmp.webp";

  const sizeBefore = fs.statSync(fullPath).size;
  totalBefore += sizeBefore;

  process.stdout.write(`   ${file}  (${Math.round(sizeBefore / 1024)} KB) → `);

  // Re-encode: scale width to TARGET_WIDTH, keep aspect ratio, new quality
  const result = spawnSync(
    "ffmpeg",
    [
      "-i",   fullPath,
      "-vf",  `scale=${TARGET_WIDTH}:-2`,   // -2 = keep aspect, divisible by 2
      "-c:v", "libwebp",
      "-lossless", "0",
      "-compression_level", String(COMPRESSION),
      "-quality", String(WEBP_QUALITY),
      "-y",
      tmpPath,
    ],
    { encoding: "utf8" }
  );

  if (result.status !== 0) {
    console.error(`\n❌  ffmpeg failed on ${file}:`);
    console.error(result.stderr);
    // Clean up temp file if present
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    process.exit(1);
  }

  const sizeAfter = fs.statSync(tmpPath).size;
  totalAfter += sizeAfter;

  // Replace original with optimized version
  fs.renameSync(tmpPath, fullPath);

  const saving = Math.round((1 - sizeAfter / sizeBefore) * 100);
  console.log(`${Math.round(sizeAfter / 1024)} KB  (−${saving}%)`);
}

const totalSavingPct = Math.round((1 - totalAfter / totalBefore) * 100);
console.log(`
✅  Done!
   Before : ${Math.round(totalBefore / 1024)} KB total
   After  : ${Math.round(totalAfter  / 1024)} KB total
   Saved  : −${totalSavingPct}%
`);
