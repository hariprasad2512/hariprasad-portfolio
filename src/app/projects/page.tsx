import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/ui/Reveal";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Web, mobile, and AI projects built by Hariprasad Anuganti — with links to live demos and source code.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="projects"
        title="Things I've built"
        description="A selection of products and experiments across web, mobile, and AI."
      />

      <ul className="grid gap-4 pb-8 sm:grid-cols-2">
        {projects.map((project, index) => (
          <li key={project.name} className={index === projects.length - 1 && projects.length % 2 === 1 ? "sm:col-span-2" : undefined}>
            <Reveal delay={(index % 2) * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Container>
  );
}
