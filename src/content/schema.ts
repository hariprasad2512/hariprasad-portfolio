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

export const projectVisualSchema = z.object({
  type: z.enum([
    "lisa",
    "spently",
    "maargam",
    "dashboard",
    "terminal",
    "mobile",
    "chart",
    "grid",
  ]),
  label: nonEmpty,
  note: nonEmpty,
});

const caseStudySectionSchema = z.object({
  title: nonEmpty,
  body: nonEmpty,
});

const caseStudyMetricSchema = z.object({
  label: nonEmpty,
  value: nonEmpty,
});

export const caseStudySchema = z.object({
  sections: z.array(caseStudySectionSchema).min(1),
  metrics: z.array(caseStudyMetricSchema).optional(),
});

export const projectSchema = z.object({
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
  visual: projectVisualSchema,
  caseStudy: caseStudySchema.optional(),
});

export const projectsContentSchema = z.object({
  section: sectionHeadingSchema.extend({
    railHint: nonEmpty,
    caseStudyLabel: nonEmpty,
    caseStudyCta: nonEmpty,
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
      visit: nonEmpty,
    }),
    meta: z.object({
      year: nonEmpty,
      role: nonEmpty,
      type: nonEmpty,
      stack: nonEmpty,
    }),
    other: sectionHeadingSchema,
  }),
  featured: z.array(projectSchema).min(1),
  other: z.array(projectSchema),
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

export const educationItemSchema = z.object({
  id: slug,
  institution: nonEmpty,
  degree: nonEmpty,
  period: nonEmpty,
  location: nonEmpty,
  detail: nonEmpty,
  highlights: z.array(nonEmpty).optional(),
});

export const achievementSchema = z.object({
  id: slug,
  title: nonEmpty,
  issuer: nonEmpty,
  year: nonEmpty,
  description: z.string().optional(),
  link: url.optional(),
});

export const experienceContentSchema = z.object({
  section: sectionHeadingSchema,
  panel: z.object({
    title: nonEmpty,
    hint: nonEmpty,
  }),
  items: z.array(experienceItemSchema).min(1),
  education: z.object({
    label: nonEmpty,
    items: z.array(educationItemSchema),
  }),
  achievements: z.object({
    label: nonEmpty,
    note: nonEmpty,
    items: z.array(achievementSchema),
  }),
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
  interests: z.object({
    label: nonEmpty,
    note: nonEmpty,
    items: z
      .array(
        z.object({
          label: nonEmpty,
          note: nonEmpty,
        }),
      )
      .min(1),
  }),
});

const formFieldSchema = z.object({
  label: nonEmpty,
  placeholder: nonEmpty,
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
    title: nonEmpty,
    note: nonEmpty,
    fields: z.object({
      name: formFieldSchema,
      email: formFieldSchema,
      message: formFieldSchema,
    }),
    submit: nonEmpty,
    submitting: nonEmpty,
    mailtoMessage: nonEmpty,
    successMessage: nonEmpty,
    errorMessage: nonEmpty,
    fallback: nonEmpty,
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
});

export const blogContentSchema = z.object({
  section: sectionHeadingSchema,
  profile: z.object({
    url: optionalUrl,
  }),
  labels: z.object({
    read: nonEmpty,
    profileCta: nonEmpty,
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
  labels: z.object({
    open: nonEmpty,
    close: nonEmpty,
    previous: nonEmpty,
    next: nonEmpty,
  }),
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
export type CaseStudy = z.infer<typeof caseStudySchema>;
export type CaseStudySection = z.infer<typeof caseStudySectionSchema>;
export type ExperienceContent = z.infer<typeof experienceContentSchema>;
export type ExperienceItem = z.infer<typeof experienceItemSchema>;
export type EducationItem = z.infer<typeof educationItemSchema>;
export type Achievement = z.infer<typeof achievementSchema>;
export type AboutContent = z.infer<typeof aboutContentSchema>;
export type ContactContent = z.infer<typeof contactContentSchema>;
export type FooterContent = z.infer<typeof footerContentSchema>;
export type BlogContent = z.infer<typeof blogContentSchema>;
export type BlogPost = z.infer<typeof blogPostSchema>;
export type GalleryContent = z.infer<typeof galleryContentSchema>;
export type GalleryItem = z.infer<typeof galleryItemSchema>;
