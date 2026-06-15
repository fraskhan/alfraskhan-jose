import { execSync, spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const VIDEO_PATH = path.join(ROOT, "public", "myvid.mp4");
const OUTPUT_DIR = path.join(ROOT, "public", "profilepic");
const FRAME_COUNT = 50;

// ── 1. Sanity check ──────────────────────────────────────────────────────────
if (!fs.existsSync(VIDEO_PATH)) {
  console.error(`❌  Video not found: ${VIDEO_PATH}`);
  process.exit(1);
}

// ── 2. Get video duration via ffprobe ────────────────────────────────────────
console.log("🎬  Reading video duration…");

const probe = spawnSync(
  "ffprobe",
  [
    "-v", "error",
    "-show_entries", "format=duration",
    "-of", "default=noprint_wrappers=1:nokey=1",
    VIDEO_PATH,
  ],
  { encoding: "utf8" }
);

if (probe.error || probe.status !== 0) {
  console.error("❌  ffprobe failed. Make sure ffmpeg/ffprobe is installed and on PATH.");
  console.error(probe.stderr || probe.error?.message);
  process.exit(1);
}

const duration = parseFloat(probe.stdout.trim());
if (isNaN(duration) || duration <= 0) {
  console.error("❌  Could not read a valid duration from the video.");
  process.exit(1);
}

console.log(`   Duration: ${duration.toFixed(3)}s`);

// ── 2b. Auto-detect crop to remove black bars ─────────────────────────────────
console.log("✂️   Detecting black bars (cropdetect)…");

const cropDetect = spawnSync(
  "ffmpeg",
  [
    "-i", VIDEO_PATH,
    "-vf", "cropdetect=24:2:0",
    "-t", "5",           // sample first 5 s
    "-f", "null", "-",
  ],
  { encoding: "utf8" }
);

// cropdetect output is on stderr
const cropMatch = (cropDetect.stderr || "").match(/crop=(\d+:\d+:\d+:\d+)/g);
let cropFilter = null;
if (cropMatch && cropMatch.length > 0) {
  cropFilter = cropMatch[cropMatch.length - 1]; // last / most stable value
  console.log(`   Crop filter: ${cropFilter}`);
} else {
  console.log("   No black bars detected — using full frame.");
}

// ── 3. Prepare output directory ───────────────────────────────────────────────
if (fs.existsSync(OUTPUT_DIR)) {
  fs.rmSync(OUTPUT_DIR, { recursive: true });
}
fs.mkdirSync(OUTPUT_DIR, { recursive: true });
console.log(`📁  Output directory ready: ${OUTPUT_DIR}`);

// ── 4. Extract frames ─────────────────────────────────────────────────────────
//  We place timestamps at:  t_i = (i / (N-1)) * duration   for i = 0 … N-1
//  This guarantees the very first and very last frames are included.

console.log(`🖼️   Extracting ${FRAME_COUNT} frames…\n`);

for (let i = 0; i < FRAME_COUNT; i++) {
  // Cap to (duration - 0.1s) so the last seek never overshoots the final frame
  const t = Math.min((i / (FRAME_COUNT - 1)) * duration, duration - 0.1);
  // Zero-pad index: 01, 02, … 50
  const index = String(i + 1).padStart(2, "0");
  const outFile = path.join(OUTPUT_DIR, `frame_${index}.webp`);

  process.stdout.write(`   [${index}/${FRAME_COUNT}] t=${t.toFixed(3)}s → frame_${index}.webp … `);

  const result = spawnSync(
    "ffmpeg",
    [
      "-ss", t.toFixed(6),       // seek BEFORE input for speed
      "-i", VIDEO_PATH,
      "-frames:v", "1",          // grab exactly one frame
      "-an",                     // drop audio stream
      "-vf", cropFilter ? cropFilter : "scale=iw:ih",  // crop black bars if detected
      "-c:v", "libwebp",         // force single-frame WebP encoder
      "-lossless", "0",
      "-compression_level", "6",
      "-quality", "85",          // WebP quality 0-100
      "-y",                      // overwrite without asking
      outFile,
    ],
    { encoding: "utf8" }
  );

  if (result.status !== 0) {
    console.error(`\n❌  ffmpeg failed on frame ${index}:`);
    console.error(result.stderr);
    process.exit(1);
  }

  console.log("✓");
}

console.log(`\n✅  Done! ${FRAME_COUNT} WebP frames saved to:\n   ${OUTPUT_DIR}`);
