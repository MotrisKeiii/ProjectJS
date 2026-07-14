"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="h-8 w-14 rounded-full bg-slate-200 dark:bg-slate-700" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
      title={isDark ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
      className={`
        relative inline-flex h-8 w-14 shrink-0 items-center
        rounded-full border transition-colors duration-300
        ${
          isDark
            ? "border-slate-600 bg-slate-700"
            : "border-slate-300 bg-slate-200"
        }
      `}
    >
      <span
        className={`
          flex h-6 w-6 items-center justify-center rounded-full
          bg-white shadow-md transition-transform duration-300
          ${isDark ? "translate-x-7" : "translate-x-1"}
        `}
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-slate-700" />
        ) : (
          <Sun className="h-4 w-4 text-amber-500" />
        )}
      </span>
    </button>
  );
}
