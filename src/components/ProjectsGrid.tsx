"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import ProjectFilters from "./ProjectFilters";
import ProjectCard from "./ProjectCard";
import Reveal from "./ui/Reveal";
import { categoryToSlug, type Project } from "@/data/projects";

/**
 * Projects orchestrator, styled after the Gallery: owns the category
 * filter and keeps it in sync with the URL (`/projects?category=web`)
 * so filtered views are shareable. The URL is the single source of
 * truth — no separate state to drift out of sync.
 */
export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeSlug = searchParams.get("category") ?? "all";

  const filtered = useMemo(() => {
    if (activeSlug === "all") return projects;
    return projects.filter(
      (project) => categoryToSlug(project.category) === activeSlug,
    );
  }, [activeSlug, projects]);

  const changeFilter = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    const query = params.toString();
    // replace: filtering is a view change, not a page visit — keeps
    // history clean. scroll: false keeps the scroll position on tap.
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const spanLast = filtered.length % 2 === 1;

  return (
    <div>
      <ProjectFilters active={activeSlug} onChange={changeFilter} />

      <motion.div
        key={activeSlug}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mt-8"
      >
        {filtered.length > 0 ? (
          <ul className="grid gap-4 pb-8 sm:grid-cols-2">
            {filtered.map((project, index) => (
              <li
                key={project.name}
                className={
                  spanLast && index === filtered.length - 1
                    ? "sm:col-span-2"
                    : undefined
                }
              >
                <Reveal delay={(index % 2) * 0.05}>
                  <ProjectCard project={project} />
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-12 text-center text-sm text-muted">
            No projects in this category yet.
          </p>
        )}
      </motion.div>
    </div>
  );
}
