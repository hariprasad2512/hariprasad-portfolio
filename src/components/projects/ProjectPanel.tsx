"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { Project } from "@/content/schema";
import { projectsSection } from "@/content";
import ProjectVisual from "@/components/projects/ProjectVisual";

type ProjectPanelProps = {
  project: Project;
  index: number;
  total: number;
  onOpen: (slug: string, origin?: { x: number; y: number }) => void;
};

export default function ProjectPanel({
  project,
  index,
  total,
  onOpen,
}: ProjectPanelProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 160, damping: 18 });
  const rotateY = useSpring(rawRotateY, { stiffness: 160, damping: 18 });
  const number = String(index + 1).padStart(2, "0");
  const hasCaseStudy = Boolean(project.caseStudy);

  function handleMove(event: React.PointerEvent<HTMLElement>) {
    const element = ref.current;
    if (!element || reduced || event.pointerType !== "mouse") return;
    const rect = element.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rawRotateY.set((px - 0.5) * 5);
    rawRotateX.set(-(py - 0.5) * 5);
    element.style.setProperty("--mx", `${px * 100}%`);
    element.style.setProperty("--my", `${py * 100}%`);
  }

  function handleLeave() {
    rawRotateX.set(0);
    rawRotateY.set(0);
  }

  return (
    <motion.article
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onClick={(event) => {
        if (!hasCaseStudy) return;
        const target = event.target as Element;
        if (target.closest("a, button, [role='button']")) return;
        onOpen(project.slug, { x: event.clientX, y: event.clientY });
      }}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className="group relative flex w-full shrink-0 flex-col overflow-hidden rounded-xl border border-rule bg-surface/85 p-5 transition-colors duration-500 hover:border-rule-strong sm:p-7 md:w-[min(88vw,880px)] lg:h-[600px] lg:p-8"
      data-cursor-label={
        hasCaseStudy ? projectsSection.labels.caseStudyCursor : undefined
      }
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), var(--accent-soft), transparent 65%)",
        }}
      />

      <div className="relative flex items-center justify-between border-b border-rule pb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint sm:text-[10px]">
        <span className="text-ink">({number})</span>
        <span>{project.category}</span>
        <span>{project.year}</span>
      </div>

      <div className="relative grid flex-1 gap-8 py-7 md:grid-cols-[1.12fr_0.88fr] md:items-center md:py-8">
        <div className="flex flex-col justify-center">
          <h3 className="font-display text-[clamp(2.9rem,6vw,4.6rem)] leading-[0.92] tracking-[-0.01em]">
            {project.name}
          </h3>
          <p className="mt-3 font-display text-lg italic text-accent sm:text-xl">
            {project.tagline}
          </p>
          <p className="mt-4 max-w-md text-[13px] leading-6 text-ink-soft sm:text-sm sm:leading-7">
            {project.description}
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
            {project.stack.map((technology) => (
              <li
                key={technology}
                className="rounded-full border border-rule px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-ink-soft"
              >
                {technology}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            {hasCaseStudy && (
              <button
                type="button"
                onClick={(event) =>
                  onOpen(project.slug, {
                    x: event.clientX,
                    y: event.clientY,
                  })
                }
                className="group/cta inline-flex items-center gap-2 text-[12px] font-medium tracking-wide"
                data-cursor-label={projectsSection.labels.open}
              >
                <span className="border-b border-ink pb-0.5 transition-colors group-hover/cta:border-accent group-hover/cta:text-accent">
                  {projectsSection.caseStudyCta}
                </span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover/cta:translate-x-1"
                >
                  →
                </span>
              </button>
            )}

            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-ink-soft underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink"
                data-cursor-label={projectsSection.labels.live}
              >
                {project.linkLabel ?? "Live demo"} ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-ink-soft underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink"
                data-cursor-label={projectsSection.labels.code}
              >
                {projectsSection.labels.github} ↗
              </a>
            )}
          </div>
        </div>

        <div className="relative h-[210px] w-full rounded-lg border border-rule bg-paper-2/40 p-4 sm:h-[260px] md:h-[300px] lg:h-[340px]">
          <ProjectVisual project={project} />
        </div>
      </div>

      <div className="relative flex items-center justify-between border-t border-rule pt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint sm:text-[10px]">
        <span>{project.role}</span>
        <span>
          {number} / {String(total).padStart(2, "0")}
        </span>
      </div>
    </motion.article>
  );
}
