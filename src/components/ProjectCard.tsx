import type { Project } from "@/data/projects";

/**
 * A single project card — used on the home-page teaser and the
 * Projects page. The whole card links out when a URL exists,
 * otherwise it's presented as static content.
 */
export default function ProjectCard({ project }: { project: Project }) {
  const url = project.href ?? project.githubUrl;
  const external = url?.startsWith("http");

  const body = (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs tracking-wide text-muted">
          {project.category}
        </span>
        {url ? (
          <span
            aria-hidden="true"
            className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            ↗
          </span>
        ) : null}
      </div>
      <h3 className="mt-2 font-medium tracking-tight">
        <span className="font-mono text-sm text-muted">{project.number}</span>
        <span className="ml-2">{project.name}</span>
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        {project.description}
      </p>
      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies used">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded border border-border px-1.5 py-0.5 font-mono text-[11px] text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>
    </>
  );

  const classes =
    "group flex h-full flex-col rounded-xl border border-border bg-card p-4 transition-colors " +
    (url
      ? "hover:border-foreground/25"
      : "cursor-default");

  if (url) {
    return (
      <a
        href={url}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={classes}
      >
        {body}
      </a>
    );
  }
  return <div className={classes}>{body}</div>;
}
