"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/content/schema";
import { projectsSection } from "@/content";
import ProjectVisual from "@/components/projects/ProjectVisual";
import { lockScroll } from "@/lib/scrollLock";
import { isTopOverlay, pushOverlay } from "@/lib/overlayStack";

type CaseStudyOverlayProps = {
  project: Project;
  index: number;
  total: number;
  origin: { x: number; y: number } | null;
  onClose: () => void;
  onNavigate: (direction: 1 | -1) => void;
  previous: Project;
  next: Project;
};

export default function CaseStudyOverlay({
  project,
  index,
  total,
  origin,
  onClose,
  onNavigate,
  previous,
  next,
}: CaseStudyOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const number = String(index + 1).padStart(2, "0");
  const caseStudy = project.caseStudy;

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const unlock = lockScroll();
    const removeOverlay = pushOverlay("case-study");
    closeRef.current?.focus({ preventScroll: true });

    function onKeyDown(event: KeyboardEvent) {
      if (!isTopOverlay("case-study")) return;
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      unlock();
      removeOverlay();
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus({ preventScroll: true });
    };
  }, [onClose]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project.slug]);

  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? window.innerHeight / 2;
  const radius =
    typeof window === "undefined"
      ? 1200
      : Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y),
        );

  return (
    <motion.div
      ref={scrollRef}
      className="fixed inset-0 z-[95] overflow-y-auto overscroll-contain bg-paper"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      initial={
        reduced
          ? { opacity: 0 }
          : {
              clipPath: `circle(0px at ${x}px ${y}px)`,
            }
      }
      animate={
        reduced
          ? { opacity: 1 }
          : {
              clipPath: `circle(${radius + 80}px at ${x}px ${y}px)`,
            }
      }
      exit={{ opacity: 0, transition: { duration: 0.22 } }}
      transition={{ duration: reduced ? 0.2 : 0.65, ease: [0.76, 0, 0.24, 1] }}
    >
      <div
        ref={panelRef}
        className="mx-auto w-full max-w-[1120px] px-5 pb-24 pt-6 sm:px-8 sm:pt-8"
      >
        <div className="sticky top-0 z-20 -mx-5 flex items-center justify-between border-b border-rule bg-paper/90 px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint sm:text-[10px]">
            {projectsSection.caseStudyLabel} — {number} /{" "}
            {String(total).padStart(2, "0")}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 rounded-full border border-rule px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:border-ink hover:text-ink sm:text-[10px]"
            data-cursor-label={projectsSection.labels.close}
          >
            {projectsSection.labels.close}
            <span aria-hidden="true">✕</span>
            <kbd className="hidden rounded border border-rule px-1 py-0.5 text-[8px] sm:inline">
              esc
            </kbd>
          </button>
        </div>

        <motion.div
          key={project.slug}
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid gap-8 pt-10 sm:pt-14 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                {project.category}
              </p>
              <h2
                id="case-study-title"
                className="mt-3 font-display text-[clamp(3.6rem,10vw,7.5rem)] leading-[0.88] tracking-[-0.02em]"
              >
                {project.name}
              </h2>
              <p className="mt-4 max-w-xl font-display text-xl italic text-ink-soft sm:text-2xl">
                {project.tagline}
              </p>
            </div>

            <div className="relative h-[200px] rounded-xl border border-rule bg-surface p-4 sm:h-[260px]">
              <ProjectVisual project={project} />
            </div>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-rule py-6 sm:mt-14 sm:grid-cols-4">
            {[
              [projectsSection.meta.year, project.year],
              [projectsSection.meta.role, project.role],
              [
                projectsSection.meta.type,
                project.category.split(" · ")[0],
              ],
              [projectsSection.meta.stack, project.stack.join(", ")],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
                  {label}
                </dt>
                <dd className="mt-2 text-[12px] leading-5 text-ink sm:text-[13px]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          {caseStudy?.metrics && caseStudy.metrics.length > 0 && (
            <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {caseStudy.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-lg border border-rule bg-surface/60 px-4 py-3"
                >
                  <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
                    {metric.label}
                  </dt>
                  <dd className="mt-1 font-display text-2xl leading-none text-accent">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-10 max-w-3xl space-y-10 sm:mt-14 sm:space-y-12">
            {(caseStudy?.sections ?? []).map((section, index) => (
              <motion.section
                key={section.title}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.25 + index * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[9px] tracking-[0.18em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl italic sm:text-3xl">
                    {section.title}
                  </h3>
                </div>
                <p className="mt-3 text-[14px] leading-7 text-ink-soft sm:text-[15px] sm:leading-8">
                  {section.body}
                </p>
              </motion.section>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[12px] font-medium text-paper transition-colors hover:bg-accent hover:text-on-accent"
                data-cursor-label={projectsSection.labels.visit}
              >
                {project.linkLabel ?? "Live demo"}
                <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-rule-strong px-5 py-3 text-[12px] font-medium transition-colors hover:bg-paper-2"
                data-cursor-label={projectsSection.labels.code}
              >
                {projectsSection.labels.source} ↗
              </a>
            )}
          </div>

          <div className="mt-16 grid gap-4 border-t border-rule pt-6 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => onNavigate(-1)}
              className="group flex items-center gap-4 text-left"
              data-cursor-label={previous.name}
            >
              <span className="font-mono text-[10px] text-ink-faint">←</span>
              <span>
                <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
                  {projectsSection.labels.previous}
                </span>
                <span className="mt-1 block font-display text-xl transition-colors group-hover:text-accent">
                  {previous.name}
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate(1)}
              className="group flex items-center justify-end gap-4 text-right sm:text-right"
              data-cursor-label={next.name}
            >
              <span>
                <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
                  {projectsSection.labels.next}
                </span>
                <span className="mt-1 block font-display text-xl transition-colors group-hover:text-accent">
                  {next.name}
                </span>
              </span>
              <span className="font-mono text-[10px] text-ink-faint">→</span>
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
