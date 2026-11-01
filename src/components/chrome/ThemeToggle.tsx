"use client";

import { useTheme } from "@/components/chrome/ThemeProvider";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={(event) => toggle({ x: event.clientX, y: event.clientY })}
      className={`group relative flex h-9 w-9 items-center justify-center rounded-full border border-rule transition-colors hover:border-rule-strong hover:bg-paper-2 ${className}`}
      aria-label="Toggle color theme"
      data-cursor-label="Theme"
    >
      <svg
        className="theme-sun h-[15px] w-[15px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
      </svg>
      <svg
        className="theme-moon h-[15px] w-[15px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 14.4A8.2 8.2 0 0 1 9.6 4a8.4 8.4 0 1 0 10.4 10.4Z" />
      </svg>
    </button>
  );
}
