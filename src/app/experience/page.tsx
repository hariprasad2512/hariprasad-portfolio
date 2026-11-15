import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
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
          <li key={`${item.company}-${item.period}`} className="relative pb-12 pl-6 last:pb-4">
            <span
              aria-hidden="true"
              className="absolute -left-[5.5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-accent"
            />
            <Reveal delay={index * 0.05}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="text-lg font-medium tracking-tight">{item.role}</h2>
                <span className="font-mono text-xs text-muted">{item.period}</span>
              </div>
              <p className="mt-0.5 font-mono text-xs text-muted">
                {item.company} · {item.location}
              </p>
              <ul className="mt-4 space-y-2.5">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight.slice(0, 24)}
                    className="flex gap-2.5 text-sm leading-relaxed text-muted"
                  >
                    <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-muted/60" />
                    {highlight}
                  </li>
                ))}
              </ul>
              {item.tech.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
                  {item.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded border border-border px-1.5 py-0.5 font-mono text-[11px] text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              ) : null}
            </Reveal>
          </li>
        ))}
      </ol>
    </Container>
  );
}
