import { z } from "zod";

const nonEmpty = z.string().trim().min(1, "Must not be empty");
const url = z.url("Must be a valid URL");
const optionalUrl = z.union([url, z.literal("")]);
const slug = z
  .string()
  .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens");

export const socialSchema = z.object({
  id: slug,
  label: nonEmpty,
  url,
  handle: z.string().optional(),
});

export const navItemSchema = z.object({
  id: slug,
  label: nonEmpty,
  href: nonEmpty,
});

export const siteSchema = z.object({
  name: nonEmpty,
  firstName: nonEmpty,
  role: nonEmpty,
  location: nonEmpty,
  coordinates: nonEmpty,
  availability: nonEmpty,
  email: z.email("Must be a valid email address"),
  socials: z.array(socialSchema).min(1),
  seo: z.object({
    title: nonEmpty,
    description: nonEmpty,
    ogTitle: nonEmpty,
    ogDescription: nonEmpty,
    twitterCard: z.enum(["summary", "summary_large_image"]),
  }),
  navigation: z.array(navItemSchema).min(1),
});

export const ctaSchema = z.object({
  label: nonEmpty,
  href: nonEmpty,
  cursorLabel: z.string().optional(),
});

export const homeSchema = z.object({
  hero: z.object({
    headline: z.object({
      lead: nonEmpty,
      accent: nonEmpty,
    }),
    intro: nonEmpty,
    primaryCta: ctaSchema,
    secondaryCta: ctaSchema,
    scrollLabel: nonEmpty,
    edition: nonEmpty,
  }),
});

const sectionHeadingSchema = z.object({
  eyebrow: nonEmpty,
  title: nonEmpty,
  titleAccent: nonEmpty,
  note: nonEmpty,
});

const caseStudySchema = z.object({
  problem: nonEmpty,
  approach: nonEmpty,
  outcome: nonEmpty,
});

export const projectSchema = z.object({
  number: z.string().regex(/^\d{2}$/, "Use a two-digit number, for example 01"),
  slug,
  name: nonEmpty,
  category: nonEmpty,
  year: z.string().regex(/^\d{4}$/, "Use a four-digit year"),
  role: nonEmpty,
  tagline: nonEmpty,
  description: nonEmpty,
  stack: z.array(nonEmpty).min(1),
  href: url.optional(),
  githubUrl: url.optional(),
  linkLabel: nonEmpty.optional(),
  visual: z.enum(["lisa", "spently", "maargam"]),
  visualLabel: nonEmpty,
  visualNote: nonEmpty,
  caseStudy: caseStudySchema,
});

export const projectsContentSchema = z.object({
  section: sectionHeadingSchema.extend({
    railHint: nonEmpty,
    caseStudyLabel: nonEmpty,
    caseStudyCta: nonEmpty,
    caseStudySections: z.object({
      problem: nonEmpty,
      approach: nonEmpty,
      outcome: nonEmpty,
    }),
    labels: z.object({
      github: nonEmpty,
      previous: nonEmpty,
      next: nonEmpty,
      open: nonEmpty,
      live: nonEmpty,
      code: nonEmpty,
      source: nonEmpty,
      close: nonEmpty,
      caseStudyCursor: nonEmpty,
    }),
  }),
  items: z.array(projectSchema).min(1),
});

export const experienceItemSchema = z.object({
  id: slug,
  company: nonEmpty,
  role: nonEmpty,
  period: nonEmpty,
  short: nonEmpty,
  location: nonEmpty,
  summary: nonEmpty,
  stack: z.array(nonEmpty).min(1),
  highlights: z.array(nonEmpty).min(1),
});

export const experienceContentSchema = z.object({
  section: sectionHeadingSchema,
  panel: z.object({
    title: nonEmpty,
    hint: nonEmpty,
  }),
  items: z.array(experienceItemSchema).min(1),
});

const skillSchema = z.object({
  name: nonEmpty,
  usedIn: nonEmpty,
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
  size: z.enum(["sm", "md", "lg"]),
});

export const aboutContentSchema = z.object({
  section: sectionHeadingSchema,
  intro: z.array(nonEmpty).min(1),
  facts: z
    .array(
      z.object({
        label: nonEmpty,
        value: nonEmpty,
      }),
    )
    .min(1),
  cloud: z.object({
    backgroundWord: nonEmpty,
    idleMessage: nonEmpty,
  }),
  skills: z.array(skillSchema).min(1),
});

export const contactContentSchema = z.object({
  section: z.object({
    eyebrow: nonEmpty,
    titleLines: z.array(nonEmpty).min(1),
    titleAccent: nonEmpty,
  }),
  intro: nonEmpty,
  cta: z.object({
    label: nonEmpty,
    note: nonEmpty,
    cursorLabel: nonEmpty,
  }),
  labels: z.object({
    copyEmail: nonEmpty,
    email: nonEmpty,
  }),
  form: z.object({
    enabled: z.boolean(),
    provider: z.enum(["mailto", "web3forms", "formspree"]),
    endpoint: optionalUrl,
    accessKey: z.string(),
    subject: nonEmpty,
    successMessage: nonEmpty,
    errorMessage: nonEmpty,
  }),
});

export const footerContentSchema = z.object({
  marquee: z
    .array(
      z.object({
        text: nonEmpty,
        emphasis: z.boolean(),
      }),
    )
    .min(1),
  tagline: nonEmpty,
  note: nonEmpty,
  typeNote: nonEmpty,
  copyright: nonEmpty,
});

export const blogPostSchema = z.object({
  slug,
  title: nonEmpty,
  url,
  publication: nonEmpty,
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD"),
  readTime: nonEmpty,
  excerpt: nonEmpty,
  tags: z.array(nonEmpty),
  coverImage: z.string().optional(),
});

export const blogContentSchema = z.object({
  section: sectionHeadingSchema,
  profile: z.object({
    label: nonEmpty,
    url: optionalUrl,
    handle: z.string(),
  }),
  posts: z.array(blogPostSchema),
});

export const galleryItemSchema = z.object({
  src: z
    .string()
    .regex(/^\/gallery\//, "Gallery images must live under /gallery/"),
  alt: nonEmpty,
  caption: nonEmpty,
  year: z.string().optional(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export const galleryContentSchema = z.object({
  section: sectionHeadingSchema,
  groups: z
    .array(
      z.object({
        id: slug,
        label: nonEmpty,
        items: z.array(galleryItemSchema),
      }),
    )
    .min(1),
});

export type SiteContent = z.infer<typeof siteSchema>;
export type HomeContent = z.infer<typeof homeSchema>;
export type ProjectsContent = z.infer<typeof projectsContentSchema>;
export type Project = z.infer<typeof projectSchema>;
export type ExperienceContent = z.infer<typeof experienceContentSchema>;
export type ExperienceItem = z.infer<typeof experienceItemSchema>;
export type AboutContent = z.infer<typeof aboutContentSchema>;
export type ContactContent = z.infer<typeof contactContentSchema>;
export type FooterContent = z.infer<typeof footerContentSchema>;
export type BlogContent = z.infer<typeof blogContentSchema>;
export type BlogPost = z.infer<typeof blogPostSchema>;
export type GalleryContent = z.infer<typeof galleryContentSchema>;
export type GalleryItem = z.infer<typeof galleryItemSchema>;
