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
      <div className="w-[120px] h-8 rounded-full bg-black/10 dark:bg-white/10 animate-pulse" />
    );
  }

  const isDark = theme === "dark";

  function handleToggle() {
    const nextTheme = isDark ? "light" : "dark";
    triggerAnimation(nextTheme === "dark" ? "forward" : "backward");
    setTheme(nextTheme);
  }

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle theme"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`
        relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold
        border transition-all duration-300 select-none cursor-pointer
        ${isDark
          ? "bg-slate-800 border-slate-600 text-yellow-300 hover:bg-slate-700 hover:border-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.25)]"
          : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 shadow-[0_1px_6px_rgba(0,0,0,0.12)]"
        }
      `}
    >
      {isDark ? (
        <>
          <Sun className="w-3.5 h-3.5 text-yellow-300" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 text-slate-600" />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
}
