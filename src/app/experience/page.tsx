import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import ExperienceItem from "@/components/ExperienceItem";
import { experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "The complete professional timeline of Hariprasad Anuganti — roles, responsibilities, and technologies.",
};

export default function ExperiencePage() {
  return (
    <Container>
      <PageHeader
        eyebrow="experience"
        title="Where I've worked"
        description="A complete timeline of my professional experience — what I built, where I built it, and with what."
      />

      <ol className="relative ml-1.5 border-l border-border pb-8">
        {experience.map((item, index) => (
          <li
            key={`${item.company}-${item.period}`}
            className="relative pb-12 pl-6 last:pb-4"
          >
            <span
              aria-hidden="true"
              className="absolute -left-[5.5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-accent"
            />
            <Reveal delay={index * 0.05}>
              <ExperienceItem item={item} />
            </Reveal>
          </li>
        ))}
      </ol>
    </Container>
  );
}
