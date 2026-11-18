"use client";

import { useRef, useState } from "react";
import ProjectSpotlight from "./ProjectSpotlight";
import ProjectThumb from "./ProjectThumb";
import type { Project } from "@/data/projects";

type FeaturedProjectsProps = {
  projects: Project[];
};

/**
 * Homepage project showcase: a spotlight panel plus a rail of every
 * featured project. Selecting a rail item promotes it into the
 * spotlight. Implemented as a vertical tablist on desktop and a
 * horizontal scroll-snap strip on mobile; arrow keys, Home, and End
 * move the selection like a native tablist.
 */
export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const active = projects[selected] ?? projects[0];
  if (!active) return null;

  const select = (index: number) => {
    setSelected(index);
    // Keep the chosen tab visible when the mobile rail is scrollable.
    tabRefs.current[index]?.scrollIntoView({
      block: "nearest",
      inline: "center",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const last = projects.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = selected === last ? 0 : selected + 1;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = selected === 0 ? last : selected - 1;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = last;
    }

    if (next === null) return;
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] md:items-start md:gap-5">
      <ProjectSpotlight project={active} />

      <div
        role="tablist"
        aria-label="Featured projects"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:flex-col md:overflow-visible md:px-0 md:pb-0"
      >
        {projects.map((project, index) => (
          <ProjectThumb
            key={project.number}
            project={project}
            selected={index === selected}
            onSelect={() => select(index)}
            tabIndex={index === selected ? 0 : -1}
            buttonRef={(element) => {
              tabRefs.current[index] = element;
            }}
          />
        ))}
      </div>
    </div>
  );
}
