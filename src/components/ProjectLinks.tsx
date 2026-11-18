import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import type { Project } from "@/data/projects";

const linkClass =
  "inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-foreground/80 transition-colors hover:border-foreground/25 hover:text-foreground";

/**
 * Source / Live action row shared by the project card and the homepage
 * spotlight. Renders nothing when the project has no URLs.
 */
export default function ProjectLinks({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  if (!project.githubUrl && !project.href) return null;

  return (
    <div className={`flex gap-2.5 ${className}`}>
      {project.githubUrl ? (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          <SiGithub size={15} aria-hidden="true" />
          Source
        </a>
      ) : null}
      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          {project.linkLabel ?? "Live"}
        </a>
      ) : null}
    </div>
  );
}
