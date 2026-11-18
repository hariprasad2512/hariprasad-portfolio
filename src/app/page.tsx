import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import ExperienceItem from "@/components/ExperienceItem";
import HomeGallery from "@/components/Gallery/HomeGallery";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { allSkills } from "@/data/skills";
import { blogPosts } from "@/data/blog";
import { getGalleryPhotos } from "@/lib/gallery";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default async function Home() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 5);  const allPhotos = await getGalleryPhotos();
  const featuredPhotos = allPhotos.filter((photo) => photo.featured).slice(0, 6);
  // Fall back to the first few photos until some are flagged as featured.
  const galleryPhotos =
    featuredPhotos.length > 0 ? featuredPhotos : allPhotos.slice(0, 6);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 sm:px-8">
      <Hero />

      {/* About — short intro, stays on the home page. */}
      <Section id="about" eyebrow="about" title="Problem Solver by Heart. Builder by Nature.">
        <Reveal>
          <div className="max-w-prose space-y-4 text-[15px] leading-relaxed text-muted">
            {profile.about.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          
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
        <Reveal>
          <FeaturedProjects projects={featuredProjects} />
        </Reveal>
      </Section>

      {/* Gallery — bento preview; the full grid lives on /gallery. */}
      <Section
        id="gallery"
        eyebrow="gallery"
        title="Moments"
        description="Photos from hackathons, events, and everything in between."
        moreHref="/gallery"
      >
        <Reveal>
          <HomeGallery photos={galleryPhotos} />
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
