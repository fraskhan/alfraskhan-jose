"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useThemeAnimation } from "../context/ThemeAnimationContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { triggerAnimation } = useThemeAnimation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      >
        <Sun className="w-4 h-4 opacity-0" />
      </button>
    );
  }

  function handleToggle() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    // Animate first, then swap theme
    triggerAnimation(nextTheme === "dark" ? "forward" : "backward");
    setTheme(nextTheme);
  }

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle theme"
      className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-paper-text" />
      ) : (
        <Moon className="w-4 h-4 text-paper-text" />
      )}
    </button>
  );
}
