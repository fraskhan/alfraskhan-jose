"use client";

import { FileText, Scissors, Eye } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Toolbar() {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-toolbar-bg border-b border-toolbar-border">
      <div className="flex items-center gap-1">
        <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-sm text-paper-text">
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">File</span>
        </button>
        <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-sm text-paper-text">
          <Scissors className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Edit</span>
        </button>
        <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-sm text-paper-text">
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">View</span>
        </button>
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <span className="text-xs text-ruler hidden sm:inline">Mode</span>
        <ThemeToggle />
      </div>
    </div>
  );
}
