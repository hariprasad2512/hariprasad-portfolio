import { existsSync } from "node:fs";
import path from "node:path";
import { z } from "zod";

import aboutJson from "@content/about.json";
import blogJson from "@content/blog.json";
import contactJson from "@content/contact.json";
import experienceJson from "@content/experience.json";
import footerJson from "@content/footer.json";
import galleryJson from "@content/gallery.json";
import homeJson from "@content/home.json";
import projectsJson from "@content/projects.json";
import siteJson from "@content/site.json";

import {
  aboutContentSchema,
  blogContentSchema,
  contactContentSchema,
  experienceContentSchema,
  footerContentSchema,
  galleryContentSchema,
  homeSchema,
  projectsContentSchema,
  siteSchema,
} from "./schema";

function collect<T>(
  label: string,
  schema: z.ZodType<T>,
  value: unknown,
  errors: string[],
) {
  const result = schema.safeParse(value);
  if (result.success) return result.data;

  for (const issue of result.error.issues) {
    const location = issue.path.length ? issue.path.join(".") : "(root)";
    errors.push(`${label}: ${location} — ${issue.message}`);
  }
  return null;
}

function findDuplicates(values: string[], label: string, errors: string[]) {
  const seen = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) errors.push(`${label}: duplicate "${value}"`);
    seen.add(value);
  }
}

let validated = false;

/**
 * Build-time guard for everything in /content. Runs once when the server
 * layout is evaluated, so a bad edit fails `next dev` and `next build`
 * with a file and field name instead of rendering a broken page.
 */
export function assertContent() {
  if (validated) return;

  const errors: string[] = [];

  const site = collect("content/site.json", siteSchema, siteJson, errors);
  const home = collect("content/home.json", homeSchema, homeJson, errors);
  const projects = collect(
    "content/projects.json",
    projectsContentSchema,
    projectsJson,
    errors,
  );
  const experience = collect(
    "content/experience.json",
    experienceContentSchema,
    experienceJson,
    errors,
  );
  const about = collect(
    "content/about.json",
    aboutContentSchema,
    aboutJson,
    errors,
  );
  const contact = collect(
    "content/contact.json",
    contactContentSchema,
    contactJson,
    errors,
  );
  const footer = collect(
    "content/footer.json",
    footerContentSchema,
    footerJson,
    errors,
  );
  const blog = collect("content/blog.json", blogContentSchema, blogJson, errors);
  const gallery = collect(
    "content/gallery.json",
    galleryContentSchema,
    galleryJson,
    errors,
  );

  if (
    !site ||
    !home ||
    !projects ||
    !experience ||
    !about ||
    !contact ||
    !footer ||
    !blog ||
    !gallery
  ) {
    fail(errors);
  }

  findDuplicates(
    site.socials.map((item) => item.id),
    "content/site.json socials",
    errors,
  );
  findDuplicates(
    site.navigation.map((item) => item.id),
    "content/site.json navigation ids",
    errors,
  );
  findDuplicates(
    site.navigation.map((item) => item.href),
    "content/site.json navigation links",
    errors,
  );
  findDuplicates(
    [...projects.featured, ...projects.other].map((item) => item.slug),
    "content/projects.json slugs",
    errors,
  );
  findDuplicates(
    experience.items.map((item) => item.id),
    "content/experience.json ids",
    errors,
  );
  findDuplicates(
    experience.education.items.map((item) => item.id),
    "content/experience.json education ids",
    errors,
  );
  findDuplicates(
    experience.achievements.items.map((item) => item.id),
    "content/experience.json achievement ids",
    errors,
  );
  findDuplicates(
    about.skills.map((item) => item.name),
    "content/about.json skills",
    errors,
  );
  findDuplicates(
    about.interests.items.map((item) => item.label),
    "content/about.json interests",
    errors,
  );
  findDuplicates(
    blog.posts.map((item) => item.slug),
    "content/blog.json slugs",
    errors,
  );
  findDuplicates(
    blog.posts.map((item) => item.url),
    "content/blog.json urls",
    errors,
  );
  findDuplicates(
    gallery.groups.map((item) => item.id),
    "content/gallery.json groups",
    errors,
  );
  findDuplicates(
    gallery.groups.flatMap((group) => group.items.map((item) => item.src)),
    "content/gallery.json images",
    errors,
  );

  const anchors = new Set(
    site.navigation
      .map((item) => (item.href.startsWith("#") ? item.href.slice(1) : null))
      .filter((item): item is string => Boolean(item)),
  );

  const navigationIds = new Set(site.navigation.map((item) => item.id));

  if (blog.posts.length > 0 && !navigationIds.has("writing")) {
    errors.push(
      'content/site.json: add a "writing" entry to navigation so the Writing section is reachable',
    );
  }

  if (
    gallery.groups.some((group) => group.items.length > 0) &&
    !navigationIds.has("moments")
  ) {
    errors.push(
      'content/site.json: add a "moments" entry to navigation so the Moments section is reachable',
    );
  }

  const internalLinks = [
    ...site.navigation.map((item) => item.href),
    home.hero.primaryCta.href,
    home.hero.secondaryCta.href,
  ];

  for (const link of internalLinks) {
    if (link.startsWith("#") && !anchors.has(link.slice(1))) {
      errors.push(
        `content: link "${link}" does not match any section in site.navigation`,
      );
    }
  }

  if (contact.form.enabled && contact.form.provider === "web3forms") {
    if (!contact.form.accessKey.trim()) {
      errors.push(
        'content/contact.json: provider "web3forms" needs an accessKey',
      );
    }
  }

  if (contact.form.enabled && contact.form.provider === "formspree") {
    if (!contact.form.endpoint) {
      errors.push(
        'content/contact.json: provider "formspree" needs an endpoint URL',
      );
    }
  }

  for (const group of gallery.groups) {
    for (const item of group.items) {
      const file = path.join(process.cwd(), "public", item.src);
      if (!existsSync(file)) {
        errors.push(
          `content/gallery.json: image "${item.src}" is missing from public${item.src}`,
        );
      }
    }
  }

  if (errors.length) fail(errors);

  validated = true;
}

function fail(errors: string[]): never {
  throw new Error(
    ["Content validation failed:", ...errors.map((error) => `  - ${error}`)].join(
      "\n",
    ),
  );
}
