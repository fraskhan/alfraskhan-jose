"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useThemeAnimation } from "../context/ThemeAnimationContext";

// ─── Frame helpers ────────────────────────────────────────────────────────────

const FRAME_COUNT = 50;
const FRAME_W = 700;
const FRAME_H = 1054;

const frameSrc = (n: number) =>
  `/profilepic/frame_${String(n).padStart(2, "0")}.webp`;

const idleFrame = (theme: string | undefined) =>
  theme === "dark" ? FRAME_COUNT : 1;

// ─── Module-level image cache ─────────────────────────────────────────────────
// Keeps preloaded Image objects alive across React re-renders and remounts.
// On first call it starts a single network burst; on every subsequent call
// (same JS session, same page) it returns the already-loaded array instantly.

let _frames: HTMLImageElement[] | null = null;
let _loadPromise: Promise<HTMLImageElement[]> | null = null;

function loadAllFrames(): Promise<HTMLImageElement[]> {
  if (_frames) return Promise.resolve(_frames);
  if (_loadPromise) return _loadPromise;

  _loadPromise = Promise.all(
    Array.from({ length: FRAME_COUNT }, (_, i) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = frameSrc(i + 1);
      })
    )
  ).then((imgs) => {
    _frames = imgs;
    return imgs;
  });

  return _loadPromise;
}

// ─── Canvas renderer ──────────────────────────────────────────────────────────
// A single <canvas> element that never unmounts.
// Frame changes are drawn with ctx.drawImage() — a synchronous GPU blit,
// guaranteed blink-free because there is no DOM node swap and no network I/O.

interface CanvasPhotoProps {
  /** CSS sizes hint for the enclosing box, e.g. "220px" */
  sizes: string;
}

function CanvasPhoto({ sizes: _ }: CanvasPhotoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const pendingRef = useRef<number | null>(null); // frame requested before load

  const { frameIndex } = useThemeAnimation();
  const { resolvedTheme } = useTheme();

  // Which frame should currently be visible
  const targetFrame =
    frameIndex === 1 && resolvedTheme === "dark"
      ? idleFrame(resolvedTheme)
      : frameIndex;

  // Synchronous pixel blit — zero blink
  const draw = useCallback((frame: number) => {
    const canvas = canvasRef.current;
    const imgs = framesRef.current;
    if (!canvas || imgs.length === 0) {
      pendingRef.current = frame; // draw once frames arrive
      return;
    }
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.drawImage(imgs[frame - 1], 0, 0, canvas.width, canvas.height);
  }, []);

  // Preload all frames once; draw the idle frame as soon as they're ready
  useEffect(() => {
    loadAllFrames().then((imgs) => {
      framesRef.current = imgs;
      // Use whatever frame was requested while loading, otherwise idle
      draw(pendingRef.current ?? idleFrame(resolvedTheme));
      pendingRef.current = null;
    });
    // resolvedTheme intentionally excluded — only need the initial idle state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draw]);

  // Redraw whenever the active frame changes
  useEffect(() => {
    draw(targetFrame);
  }, [targetFrame, draw]);

  return (
    <canvas
      ref={canvasRef}
      width={FRAME_W}
      height={FRAME_H}
      className="absolute inset-0 w-full h-full"
      aria-label="Al-Fraskhan A. Jose"
    />
  );
}

// ─── Download button ──────────────────────────────────────────────────────────

function DownloadButton() {
  return (
    <a
      href="/Al-Fraskhan Jose - CV (2026).pdf"
      download="Al-Fraskhan Jose - CV (2026).pdf"
      className="
        flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold
        bg-gradient-to-r from-slate-800 to-slate-600
        dark:from-yellow-400 dark:to-amber-500
        text-white dark:text-slate-900
        shadow-[0_4px_14px_rgba(0,0,0,0.35)]
        dark:shadow-[0_4px_14px_rgba(250,204,21,0.4)]
        hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,0,0,0.45)]
        dark:hover:shadow-[0_6px_20px_rgba(250,204,21,0.55)]
        transition-all duration-200 select-none
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-3.5 h-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Download CV
    </a>
  );
}

// ─── Photo container (shared layout) ─────────────────────────────────────────

interface PhotoContainerProps {
  className: string;
  boxClass: string;
  sizes: string;
}

function PhotoContainer({ className, boxClass, sizes }: PhotoContainerProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className={className}>
      <div
        className={`relative overflow-hidden shadow-2xl ring-1 ring-black/10 dark:ring-white/10 ${boxClass}`}
        style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
      >
        {/* Placeholder until JS hydrates */}
        {!mounted && (
          <div className="absolute inset-0 bg-black/5 dark:bg-white/5 animate-pulse" />
        )}
        {mounted && <CanvasPhoto sizes={sizes} />}
      </div>

      <p className="text-xs text-ruler tracking-widest uppercase select-none">
        Al-Fraskhan A. Jose
      </p>

      {mounted && <DownloadButton />}
    </div>
  );
}

// ─── Public exports ───────────────────────────────────────────────────────────

/** Mobile / tablet — shown below lg breakpoint, above the resume */
export function ProfilePhotoMobile() {
  return (
    <PhotoContainer
      className="flex lg:hidden flex-col items-center gap-3 pb-4 pt-2"
      boxClass="w-[110px] sm:w-[140px]"
      sizes="140px"
    />
  );
}

/** Desktop sidebar — sticky right column, shown at lg and above */
export default function ProfilePhoto() {
  return (
    <PhotoContainer
      className="sticky top-24 hidden lg:flex flex-col items-center gap-3 self-start"
      boxClass="w-[180px] xl:w-[220px]"
      sizes="220px"
    />
  );
}
