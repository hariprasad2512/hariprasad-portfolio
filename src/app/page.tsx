import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import ExperienceItem from "@/components/ExperienceItem";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { galleryPhotos } from "@/data/gallery";
import { allSkills } from "@/data/skills";
import { achievements } from "@/data/achievements";
import { blogPosts } from "@/data/blog";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 sm:px-8">
      <Hero />

      {/* About — short intro, stays on the home page. */}
      <Section id="about" eyebrow="about" title="A developer with a product habit">
        <Reveal>
          <div className="max-w-prose space-y-4 text-[15px] leading-relaxed text-muted">
            {profile.about.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {profile.interests.map((interest) => (
              <li key={interest.label} className="text-sm text-muted">
                <span className="text-foreground">{interest.label}</span>
                <span className="font-mono text-xs"> — {interest.note}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Experience — two most recent entries. */}
      <Section
        id="experience"
        eyebrow="experience"
        title="Recent experience"
        moreHref="/experience"
      >
        <ol className="space-y-4">
          {experience.slice(0, 2).map((item, index) => (
            <li key={item.company}>
              <Reveal delay={index * 0.05}>
                <article className="rounded-xl border border-border bg-card p-4 sm:p-5">
                  <ExperienceItem item={item} compact />
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* Projects — featured picks. */}
      <Section
        id="projects"
        eyebrow="projects"
        title="Featured projects"
        moreHref="/projects"
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {featured.slice(0, 2).map((project, index) => (
            <li key={project.name}>
              <Reveal delay={index * 0.05}>
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* Gallery — a small strip; the full grid lives on /gallery. */}
      <Section
        id="gallery"
        eyebrow="gallery"
        title="Moments"
        description="Photos from hackathons, events, and everything in between."
        moreHref="/gallery"
      >
        <Reveal>
          <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {galleryPhotos.slice(0, 6).map((photo) => (
              <li key={photo.src}>
                <Link
                  href="/gallery"
                  className="block aspect-square overflow-hidden rounded-lg border border-border transition-opacity hover:opacity-85"
                  aria-label={`${photo.title} — view gallery`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    width={400}
                    height={400}
                    sizes="(max-width: 640px) 30vw, 120px"
                    className="h-full w-full object-cover"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Skills — a compact selection. */}
      <Section
        id="skills"
        eyebrow="skills"
        title="Tools I work with"
        moreHref="/skills"
      >
        <Reveal>
          <ul className="flex flex-wrap gap-2" aria-label="Selected skills">
            {allSkills.slice(0, 12).map((skill) => (
              <li
                key={skill}
                className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-sm text-muted transition-colors hover:border-foreground/25 hover:text-foreground"
              >
                <TechIcon name={skill} />
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Achievements — compact list. */}
      <Section
        id="achievements"
        eyebrow="achievements"
        title="Highlights"
        moreHref="/achievements"
      >
        <ol className="space-y-4">
          {achievements.slice(0, 2).map((achievement, index) => (
            <li key={achievement.title}>
              <Reveal delay={index * 0.05}>
                <article className="rounded-xl border border-border bg-card p-4 sm:p-5">
                  <span className="font-mono text-xs uppercase tracking-wide text-accent">
                    {achievement.category}
                  </span>
                  <h3 className="mt-1.5 font-medium tracking-tight">
                    {achievement.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {achievement.description}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* Blog — latest posts. */}
      <Section
        id="blog"
        eyebrow="blog"
        title="Writing"
        description="Technical notes and articles, published on Medium."
        moreHref="/blog"
      >
        <ol className="divide-y divide-border">
          {blogPosts.slice(0, 2).map((post, index) => (
            <li key={post.title}>
              <Reveal delay={index * 0.05}>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4 py-4 transition-colors hover:text-muted"
                >
                  <div>
                    <h3 className="font-medium tracking-tight">{post.title}</h3>
                    <p className="mt-1 line-clamp-1 text-sm text-muted">
                      {post.description}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-muted transition-colors group-hover:text-foreground">
                    {formatDate(post.date)}
                    <span aria-hidden="true" className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">
                      ↗
                    </span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}
