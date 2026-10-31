"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "@/components/chrome/ThemeProvider";
import { toast } from "@/components/chrome/Toaster";
import { navItems, projects, site } from "@/content";
import { lockScroll } from "@/lib/scrollLock";
import { isTopOverlay, pushOverlay } from "@/lib/overlayStack";

type PaletteItem = {
  id: string;
  label: string;
  group: "Sections" | "Projects" | "Actions";
  hint: string;
  keywords?: string;
  run: () => void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const returnFocus = useRef<Element | null>(null);
  const { theme, toggle } = useTheme();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const items = useMemo<PaletteItem[]>(() => {
    const sections: PaletteItem[] = navItems.map((item) => ({
      id: `nav-${item.id}`,
      label: item.label,
      group: "Sections",
      hint: "Jump to section",
      keywords: item.href,
      run: () => {
        close();
        window.location.hash = item.href;
      },
    }));

    const projectItems: PaletteItem[] = projects.map((project) => ({
      id: `project-${project.slug}`,
      label: project.name,
      group: "Projects",
      hint: project.category,
      keywords: project.stack.join(" ") + " case study",
      run: () => {
        close();
        window.dispatchEvent(
          new CustomEvent("signal:open-project", { detail: project.slug }),
        );
      },
    }));

    const actions: PaletteItem[] = [
      {
        id: "action-theme",
        label: `Switch to ${theme === "dark" ? "paper" : "cinema"} theme`,
        group: "Actions",
        hint: "Appearance",
        keywords: "theme dark light mode color",
        run: () => {
          toggle();
          close();
        },
      },
      {
        id: "action-copy",
        label: "Copy email address",
        group: "Actions",
        hint: site.email,
        keywords: "email contact copy clipboard",
        run: () => {
          close();
          navigator.clipboard
            .writeText(site.email)
            .then(() => toast("Email copied"))
            .catch(() => toast("Copy failed — email is on screen"));
        },
      },
      {
        id: "action-email",
        label: "Send an email",
        group: "Actions",
        hint: "mailto",
        keywords: "email contact mail",
        run: () => {
          close();
          window.location.href = `mailto:${site.email}`;
        },
      },
      ...site.socials.map<PaletteItem>((item) => ({
        id: `action-${item.id}`,
        label: `Open ${item.label}`,
        group: "Actions",
        hint: item.handle ?? item.url,
        keywords: `${item.label} ${item.handle ?? ""} social link`,
        run: () => {
          close();
          window.open(item.url, "_blank", "noopener,noreferrer");
        },
      })),
    ];

    return [...sections, ...projectItems, ...actions];
  }, [close, theme, toggle]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item) =>
      `${item.label} ${item.group} ${item.hint} ${item.keywords ?? ""}`
        .toLowerCase()
        .includes(normalized),
    );
  }, [items, query]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const isShortcut = (event.metaKey || event.ctrlKey) && event.key === "k";
      if (isShortcut) {
        event.preventDefault();
        if (open) close();
        else setOpen(true);
      }
      if (event.key === "Escape" && open && isTopOverlay("palette")) close();
    }
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("signal:palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("signal:palette", onOpen);
    };
  }, [open, close]);

  useEffect(() => {
    if (!open) {
      if (returnFocus.current instanceof HTMLElement) {
        returnFocus.current.focus({ preventScroll: true });
      }
      return;
    }

    returnFocus.current = document.activeElement;
    const unlock = lockScroll();
    const removeOverlay = pushOverlay("palette");
    const timer = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => {
      unlock();
      removeOverlay();
      window.clearTimeout(timer);
    };
  }, [open]);

  useEffect(() => {
    const active = listRef.current?.querySelector<HTMLElement>(
      '[data-active="true"]',
    );
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const groups: PaletteItem["group"][] = ["Sections", "Projects", "Actions"];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]">
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-rule-strong bg-surface shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-rule px-4 py-3.5">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 text-ink-faint"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4.5 4.5" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setActiveIndex((index) =>
                      filtered.length ? (index + 1) % filtered.length : 0,
                    );
                  }
                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    setActiveIndex((index) =>
                      filtered.length
                        ? (index - 1 + filtered.length) % filtered.length
                        : 0,
                    );
                  }
                  if (event.key === "Enter") {
                    event.preventDefault();
                    filtered[activeIndex]?.run();
                  }
                }}
                placeholder="Jump to a section, project, or action…"
                className="w-full bg-transparent text-sm text-ink outline-none focus-visible:outline-none placeholder:text-ink-faint"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-autocomplete="list"
                aria-activedescendant={
                  filtered[activeIndex]
                    ? `palette-${filtered[activeIndex].id}`
                    : undefined
                }
              />
              <kbd className="hidden shrink-0 rounded border border-rule px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-ink-faint sm:block">
                esc
              </kbd>
            </div>

            <ul
              ref={listRef}
              id="palette-list"
              role="listbox"
              aria-label="Commands"
              className="max-h-[46vh] overflow-y-auto p-2"
            >
              {filtered.length === 0 && (
                <li className="px-3 py-8 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                  No signal found
                </li>
              )}

              {groups.map((group) => {
                const groupItems = filtered.filter(
                  (item) => item.group === group,
                );
                if (!groupItems.length) return null;
                return (
                  <li key={group} role="group" aria-label={group}>
                    <p className="px-3 pb-1 pt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
                      {group}
                    </p>
                    <ul>
                      {groupItems.map((item) => {
                        const index = filtered.indexOf(item);
                        const isActive = index === activeIndex;
                        return (
                          <li key={item.id}>
                            <button
                              type="button"
                              id={`palette-${item.id}`}
                              role="option"
                              aria-selected={isActive}
                              data-active={isActive}
                              onMouseEnter={() => setActiveIndex(index)}
                              onClick={item.run}
                              className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left transition-colors ${
                                isActive
                                  ? "bg-accent-soft text-ink"
                                  : "text-ink-soft"
                              }`}
                            >
                              <span className="flex items-center gap-2.5 text-[13px]">
                                <span
                                  className={`h-1 w-1 rounded-full ${
                                    isActive ? "bg-accent" : "bg-ink-faint"
                                  }`}
                                />
                                {item.label}
                              </span>
                              <span className="truncate font-mono text-[9px] uppercase tracking-[0.1em] text-ink-faint">
                                {item.hint}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between border-t border-rule px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-faint">
              <span>↑↓ navigate · ↵ select</span>
              <span>⌘K toggle</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
