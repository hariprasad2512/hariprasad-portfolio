
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 p-6 transition hover:border-slate-400">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400">
          {project.number}
        </span>
        <span className="text-xs text-slate-500">
          {project.category}
        </span>
      </div>

      <h3 className="mt-8 text-2xl font-semibold">
        {project.name}
      </h3>

      <p className="mt-3 leading-7 text-slate-600">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((technology) => (
          <span
            key={technology}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
          >
            {technology}
          </span>
        ))}
      </div>


<div className="mt-6 flex flex-wrap items-center gap-4">
  {project.href && (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
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
      className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 underline underline-offset-4 hover:text-black"
    >
      GitHub
      <span aria-hidden="true">↗</span>
    </a>
  )}
</div>
    </article>
  );
}
