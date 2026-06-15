"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useThemeAnimation } from "../context/ThemeAnimationContext";

const FRAME_COUNT = 50;

/** Zero-pad frame number to two digits: 1 → "01", 50 → "50" */
function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export default function ProfilePhoto() {
  const { frameIndex } = useThemeAnimation();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid SSR/hydration mismatch — render nothing until client mounts
  if (!mounted) return null;

  // While no animation is running the context stays at its initial value (1).
  // Show frame_01 in light mode and frame_50 in dark mode as the resting state.
  // During animation the context ticks through 1-50 or 50-1, overriding this.
  const idleFrame = resolvedTheme === "dark" ? FRAME_COUNT : 1;
  const display = frameIndex === 1 && resolvedTheme === "dark" ? idleFrame : frameIndex;

  return (
    <div
      className="sticky top-24 hidden lg:flex flex-col items-center gap-3 self-start"
      aria-label="Profile photo"
    >
      {/* Photo frame */}
      <div
        className="relative w-[200px] xl:w-[240px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10 dark:ring-white/10"
        style={{ aspectRatio: "700 / 1054" }}
      >
        <Image
          key={display}
          src={`/profilepic/frame_${pad(display)}.webp`}
          alt={`Al-Fraskhan A. Jose`}
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
    </div>
  );
}
