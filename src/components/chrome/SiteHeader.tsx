"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "@/components/chrome/ThemeToggle";
import { initials, site } from "@/content";

export function openPalette() {
  window.dispatchEvent(new CustomEvent("signal:palette"));
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[65] transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled
          ? "border-b border-rule bg-paper/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#top"
          className="group flex items-center gap-3"
          aria-label={`${site.name} — back to top`}
        >
          <span className="relative grid h-8 w-8 place-items-center rounded-full border border-rule-strong font-mono text-[10px] tracking-tight transition-colors group-hover:border-accent group-hover:text-accent">
            {initials}
            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] sm:block">
            {site.name}
          </span>
        </a>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            className="hidden items-center gap-2 rounded-full border border-rule px-3 py-[7px] font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:border-rule-strong hover:text-ink sm:flex"
            data-cursor-label="Jump"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4.5 4.5" />
            </svg>
            Jump
            <kbd className="ml-1 rounded border border-rule px-1 py-0.5 text-[9px] leading-none">
              ⌘K
            </kbd>
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={openPalette}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-rule sm:hidden"
            aria-label="Open command palette"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4.5 4.5" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
