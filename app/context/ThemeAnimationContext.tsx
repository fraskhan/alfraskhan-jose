"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from "react";

const FRAME_COUNT = 50;
const ANIMATION_DURATION_MS = 2_500;
const FRAME_INTERVAL_MS = ANIMATION_DURATION_MS / FRAME_COUNT; // 100 ms per frame

// ─── Types ────────────────────────────────────────────────────────────────────

type Direction = "forward" | "backward";

interface ThemeAnimationContextValue {
  /** Current frame number (1–50). */
  frameIndex: number;
  /** Fire the animation in the given direction. */
  triggerAnimation: (direction: Direction) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ThemeAnimationContext = createContext<ThemeAnimationContextValue>({
  frameIndex: 1,
  triggerAnimation: () => {},
});

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ThemeAnimationProvider({ children }: { children: ReactNode }) {
  const [frameIndex, setFrameIndex] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const triggerAnimation = useCallback((direction: Direction) => {
    // Cancel any in-progress animation
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const frames =
      direction === "forward"
        ? Array.from({ length: FRAME_COUNT }, (_, i) => i + 1) // 1 → 50
        : Array.from({ length: FRAME_COUNT }, (_, i) => FRAME_COUNT - i); // 50 → 1

    let step = 0;

    // Show first frame immediately
    setFrameIndex(frames[0]);
    step = 1;

    timerRef.current = setInterval(() => {
      if (step >= frames.length) {
        clearInterval(timerRef.current!);
        timerRef.current = null;
        return;
      }
      setFrameIndex(frames[step]);
      step++;
    }, FRAME_INTERVAL_MS);
  }, []);

  return (
    <ThemeAnimationContext.Provider value={{ frameIndex, triggerAnimation }}>
      {children}
    </ThemeAnimationContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useThemeAnimation() {
  return useContext(ThemeAnimationContext);
}
