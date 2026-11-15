"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

/**
 * Icon choice is pure CSS (dark: variants) so SSR and hydration
 * always agree — no flash, no mounted-state dance.
 */
export default function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title="Toggle theme"
      className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-foreground/25 hover:text-foreground active:scale-95"
    >
      <Moon className="h-4 w-4 dark:hidden" aria-hidden="true" />
      <Sun className="hidden h-4 w-4 dark:block" aria-hidden="true" />
    </button>
  );
}
