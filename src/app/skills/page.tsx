import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";
import { skillCategories } from "@/data/skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Languages, frameworks, databases, and tools Hariprasad Anuganti works with.",
};

export default function SkillsPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="skills"
        title="Tools of the trade"
        description="Grouped by where they fit in my workflow. No percentage bars — tools are tools."
      />

      <div className="space-y-8 pb-8">
        {skillCategories.map((category, index) => (
          <Reveal key={category.id} delay={index * 0.03}>
            <section aria-label={category.label}>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
                {category.label}
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-sm text-foreground/90 transition-colors hover:border-foreground/25"
                  >
                    <TechIcon name={skill} />
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
