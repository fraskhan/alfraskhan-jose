"use client";

import ThemeToggle from "./ThemeToggle";

export default function Toolbar() {
  return (
    <div className="flex items-center justify-end px-4 py-2 bg-toolbar-bg border-b border-toolbar-border">
      <ThemeToggle />
    </div>
  );
}
