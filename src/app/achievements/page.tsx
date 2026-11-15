import type { Metadata } from "next";
import {
  BadgeCheck,
  BookOpen,
  GraduationCap,
  Sparkles,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { achievements, type AchievementCategory } from "@/data/achievements";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Hackathon results, certifications, academic milestones, and other accomplishments.",
};

const categoryIcons: Record<AchievementCategory, LucideIcon> = {
  Hackathon: Trophy,
  Certification: BadgeCheck,
  Academic: GraduationCap,
  Publication: BookOpen,
  Other: Sparkles,
};

export default function AchievementsPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="achievements"
        title="Milestones & wins"
        description="Hackathons, certifications, and moments worth remembering."
      />

      <ol className="space-y-4 pb-8">
        {achievements.map((achievement, index) => {
          const Icon = categoryIcons[achievement.category] ?? Sparkles;
          return (
            <li key={achievement.title}>
              <Reveal delay={index * 0.05}>
                <article className="flex gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-foreground/25 sm:p-5">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-muted"
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h2 className="font-medium tracking-tight">{achievement.title}</h2>
                      {achievement.year ? (
                        <span className="shrink-0 font-mono text-xs text-muted">
                          {achievement.year}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {achievement.description}
                    </p>
                    <span className="mt-2 inline-block font-mono text-[11px] uppercase tracking-wide text-accent">
                      {achievement.category}
                    </span>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Container>
  );
}
