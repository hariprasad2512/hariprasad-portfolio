"use client";

import Image from "next/image";
import { ImageOff } from "lucide-react";
import type { Project } from "@/data/projects";

type ProjectThumbProps = {
  project: Project;
  selected: boolean;
  onSelect: () => void;
  /** Roving-tabindex wiring from the parent tablist. */
  tabIndex: number;
  buttonRef?: (element: HTMLButtonElement | null) => void;
};

/**
 * Selectable project row in the homepage spotlight rail. A tab that
 * promotes its project into the spotlight; the thumbnail is decorative
 * because the name sits right next to it.
 */
export default function ProjectThumb({
  project,
  selected,
  onSelect,
  tabIndex,
  buttonRef,
}: ProjectThumbProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      role="tab"
      id={`home-project-tab-${project.number}`}
      aria-selected={selected}
      aria-controls="home-project-spotlight"
      tabIndex={tabIndex}
      onClick={onSelect}
      className={`group flex w-[182px] shrink-0 snap-start items-center gap-3 rounded-xl border p-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto ${
        selected
          ? "border-accent/60 bg-accent/[0.06]"
          : "border-border bg-card/40 hover:border-foreground/25 hover:bg-card"
      }`}
    >
      <span className="relative block h-11 w-16 shrink-0 overflow-hidden rounded-md border border-border bg-background">
        {project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="64px"
            className="object-cover object-top"
          />
        ) : (
          <span className="flex h-full items-center justify-center text-muted">
            <ImageOff className="h-4 w-4 opacity-50" aria-hidden="true" />
          </span>
        )}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-baseline gap-1.5">
          <span
            className={`font-mono text-[10px] tracking-wide ${
              selected ? "text-accent" : "text-muted"
            }`}
          >
            {project.number}
          </span>
          <span className="truncate text-sm font-medium tracking-tight">
            {project.name}
          </span>
        </span>
        <span className="mt-0.5 block font-mono text-[10px] text-muted">
          {project.category}
        </span>
      </span>
    </button>
  );
}
