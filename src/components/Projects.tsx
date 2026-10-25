
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  return (
    <section id="work" className="scroll-mt-10 py-12">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
        Selected projects
      </p>

      <h2 className="mt-3 text-3xl font-semibold tracking-tight">
        Things I&apos;ve built.
      </h2>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.number}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}
