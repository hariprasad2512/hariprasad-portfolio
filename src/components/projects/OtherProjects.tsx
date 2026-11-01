import {
  otherProjects,
  projectsSection,
  sectionNumber,
} from "@/content";
import ProjectVisual from "@/components/projects/ProjectVisual";

export default function OtherProjects() {
  if (otherProjects.length === 0) return null;

  const { other, labels } = projectsSection;

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-20">
      <div className="border-t border-rule pt-6">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              ({sectionNumber("work")}) — {other.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[0.95] tracking-[-0.01em]">
              {other.title}
              <span className="mt-1 block italic text-accent">
                {other.titleAccent}
              </span>
            </h2>
          </div>
          <p className="max-w-[18rem] text-[13px] leading-6 text-ink-soft">
            {other.note}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {otherProjects.map((project) => (
          <article
            key={project.slug}
            className="group flex flex-col overflow-hidden rounded-xl border border-rule bg-surface/70 p-5 transition-colors duration-500 hover:border-rule-strong sm:p-6"
          >
            <div className="relative h-[180px] w-full rounded-lg border border-rule bg-paper-2/40 p-4">
              <ProjectVisual project={project} />
            </div>

            <div className="flex flex-1 flex-col pt-5">
              <div className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
                <span>{project.category}</span>
                <span>{project.year}</span>
              </div>

              <h3 className="mt-3 font-display text-3xl leading-none">
                {project.name}
              </h3>
              <p className="mt-2 font-display text-lg italic text-accent">
                {project.tagline}
              </p>
              <p className="mt-3 text-[13px] leading-6 text-ink-soft">
                {project.description}
              </p>

              <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                {project.stack.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-full border border-rule px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-ink-soft"
                  >
                    {technology}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-rule pt-4">
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] text-ink-soft underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink"
                    data-cursor-label={labels.live}
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
                    data-cursor-label={labels.code}
                  >
                    {labels.github} ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
