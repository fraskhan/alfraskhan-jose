"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
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

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
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
