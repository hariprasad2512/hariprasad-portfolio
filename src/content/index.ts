import aboutJson from "@content/about.json";
import blogJson from "@content/blog.json";
import contactJson from "@content/contact.json";
import experienceJson from "@content/experience.json";
import footerJson from "@content/footer.json";
import galleryJson from "@content/gallery.json";
import homeJson from "@content/home.json";
import projectsJson from "@content/projects.json";
import siteJson from "@content/site.json";

import type {
  AboutContent,
  BlogContent,
  ContactContent,
  ExperienceContent,
  FooterContent,
  GalleryContent,
  HomeContent,
  ProjectsContent,
  SiteContent,
} from "./schema";

export const site = siteJson as SiteContent;
export const home = homeJson as HomeContent;

const projectsContent = projectsJson as ProjectsContent;
export const projects = projectsContent.items;
export const projectsSection = projectsContent.section;

const experienceContent = experienceJson as ExperienceContent;
export const experience = experienceContent.items;
export const experienceSection = experienceContent.section;
export const experiencePanel = experienceContent.panel;

export const about = aboutJson as AboutContent;
export const contact = contactJson as ContactContent;
export const footer = footerJson as FooterContent;
export const blog = blogJson as BlogContent;
export const gallery = galleryJson as GalleryContent;

/** The navigation is the single source of section order and labels. */
export const navItems = site.navigation;

export function sectionNumber(id: string) {
  const index = navItems.findIndex((item) => item.id === id);
  return String(index >= 0 ? index + 1 : 0).padStart(2, "0");
}

export const initials = site.name
  .split(/\s+/)
  .map((part) => part[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

export function social(id: string) {
  return site.socials.find((item) => item.id === id);
}

export function hasBlogPosts() {
  return blog.posts.length > 0;
}

export function hasGalleryItems() {
  return gallery.groups.some((group) => group.items.length > 0);
}
