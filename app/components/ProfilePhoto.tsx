"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useThemeAnimation } from "../context/ThemeAnimationContext";

const FRAME_COUNT = 50;
const FRAME_SRCS = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/profilepic/frame_${String(i + 1).padStart(2, "0")}.webp`
);

/** Zero-pad frame number to two digits: 1 → "01", 50 → "50" */
function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** Preload all frames into the browser cache on mount. */
function usePreloadFrames() {
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (const src of FRAME_SRCS) {
      const img = new window.Image();
      img.src = src;
      images.push(img);
    }
    // keep references alive for the lifetime of the component
    return () => {
      images.length = 0;
    };
  }, []);
}

export default function ProfilePhoto() {
  const { frameIndex } = useThemeAnimation();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  usePreloadFrames();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid SSR/hydration mismatch — render nothing until client mounts
  if (!mounted) return null;

  // Idle frame: 1 in light mode, 50 in dark mode
  const idleFrame = resolvedTheme === "dark" ? FRAME_COUNT : 1;
  const display = frameIndex === 1 && resolvedTheme === "dark" ? idleFrame : frameIndex;

  return (
    <div
      className="sticky top-24 hidden lg:flex flex-col items-center gap-3 self-start"
      aria-label="Profile photo"
    >
      {/* Photo frame */}
      <div
        className="relative w-[200px] xl:w-[240px] overflow-hidden shadow-2xl ring-1 ring-black/10 dark:ring-white/10"
        style={{ aspectRatio: "700 / 1054" }}
      >
        <Image
          key={display}
          src={`/profilepic/frame_${pad(display)}.webp`}
          alt="Al-Fraskhan A. Jose"
          fill
          sizes="240px"
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      {/* Caption */}
      <p className="text-xs text-ruler tracking-widest uppercase select-none">
        Al-Fraskhan A. Jose
      </p>

      {/* Download CV */}
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
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download CV
      </a>
    </div>
  );
}
