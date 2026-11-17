import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import ProjectsGrid from "@/components/ProjectsGrid";
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

      <Suspense fallback={null}>
        <ProjectsGrid projects={projects} />
      </Suspense>
    </Container>
  );
}
