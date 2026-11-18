import Image from "next/image";
import { ImageOff } from "lucide-react";
import {
  categoryStyles,
  fallbackCategoryStyle,
  type Project,
} from "@/data/projects";
import ProjectLinks from "./ProjectLinks";
import ProjectStack from "./ProjectStack";

/**
 * Project card in the showcase style: large screenshot (or a clearly
 * marked placeholder) with a category chip, then title + date,
 * description, tech-stack badges with brand icons, and Source / Live
 * buttons. Buttons only render when a URL exists.
 */
export default function ProjectCard({ project }: { project: Project }) {
  const { border: chipBorder, text: chipText } =
    categoryStyles[project.category] ?? fallbackCategoryStyle;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-foreground/25">
      {/* Screenshot / placeholder */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-background">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            fill
            sizes="(max-width: 640px) 100vw, 380px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          // TODO: add `image: "/projects/<name>.png"` to this project in
          // src/data/projects.ts and the real screenshot replaces this.
          <div
            className="flex h-full flex-col items-center justify-center gap-2 text-muted"
            aria-label={`${project.name} screenshot placeholder`}
          >
            <ImageOff className="h-6 w-6 opacity-50" aria-hidden="true" />
            <p className="font-mono text-[11px] tracking-wide">
              screenshot placeholder
            </p>
            <p className="font-mono text-[10px] text-muted/60">
              add `image` in src/data/projects.ts
            </p>
          </div>
        )}
        <span
          className={`absolute bottom-3 left-3 rounded-md border bg-background/85 px-2 py-1 font-mono text-[11px] tracking-wide backdrop-blur-sm ${chipBorder} ${chipText}`}
        >
          {project.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">{project.name}</h3>
          {project.date ? (
            <span className="shrink-0 font-mono text-xs text-muted">{project.date}</span>
          ) : null}
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <ProjectStack stack={project.stack} className="mt-4" />
        <ProjectLinks project={project} className="mt-auto pt-5" />
      </div>
    </article>
  );
}
