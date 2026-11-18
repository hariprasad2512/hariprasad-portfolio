"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ImageOff } from "lucide-react";
import ProjectLinks from "./ProjectLinks";
import ProjectStack from "./ProjectStack";
import {
  categoryStyles,
  fallbackCategoryStyle,
  type Project,
} from "@/data/projects";

type ProjectSpotlightProps = {
  project: Project;
};

/**
 * Large, focused view of the selected homepage project. The image
 * crossfades between projects while the metadata fades and rises
 * slightly; both settle instantly when reduced motion is preferred.
 */
export default function ProjectSpotlight({ project }: ProjectSpotlightProps) {
  const prefersReducedMotion = useReducedMotion();
  const { border: chipBorder, text: chipText } =
    categoryStyles[project.category] ?? fallbackCategoryStyle;

  return (
    <article
      role="tabpanel"
      id="home-project-spotlight"
      aria-labelledby={`home-project-tab-${project.number}`}
      className="min-w-0"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-background">
        <AnimatePresence initial={false}>
          <motion.div
            key={project.number}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: "easeOut" }}
          >
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.name} screenshot`}
                fill
                sizes="(max-width: 767px) 100vw, 440px"
                className="object-cover object-top"
              />
            ) : (
              <div
                className="flex h-full flex-col items-center justify-center gap-2 text-muted"
                aria-label={`${project.name} screenshot placeholder`}
              >
                <ImageOff className="h-6 w-6 opacity-50" aria-hidden="true" />
                <p className="font-mono text-[11px] tracking-wide">
                  screenshot placeholder
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <span
          className={`absolute bottom-3 left-3 z-10 rounded-md border bg-background/85 px-2 py-1 font-mono text-[11px] tracking-wide backdrop-blur-sm ${chipBorder} ${chipText}`}
        >
          {project.category}
        </span>
      </div>

      <motion.div
        key={`${project.number}-meta`}
        initial={
          prefersReducedMotion ? false : { opacity: 0, y: 6 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.3,
          ease: "easeOut",
        }}
        className="mt-4"
      >
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-xs text-accent">{project.number}</span>
          <h3 className="text-lg font-semibold tracking-tight">
            {project.name}
          </h3>
          {project.date ? (
            <span className="ml-auto shrink-0 font-mono text-xs text-muted">
              {project.date}
            </span>
          ) : null}
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <ProjectStack stack={project.stack} className="mt-4" />
        <ProjectLinks project={project} className="mt-5" />
      </motion.div>
    </article>
  );
}
