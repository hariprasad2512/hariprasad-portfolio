/**
 * Blog posts published on Medium.
 *
 * TODO: Both entries are placeholders — replace the Medium profile URL
 * below with your real handle, then add real articles here.
 */

import { profile } from "./profile";

export type BlogPost = {
  title: string;
  description: string;
  date: string; // ISO date (YYYY-MM-DD)
  url: string;
  /** Optional display string, e.g. "6 min read". */
  readTime?: string;
  /** Optional cover image path (under /public). */
  image?: string;
};

export const mediumProfileUrl = profile.socials.find((s) => s.id === "medium")
  ?.url as string;

export const blogPosts: BlogPost[] = [
  {
    title: "Add your first article",
    description:
      "Placeholder entry — edit src/data/blog.ts to list a real Medium article with its title, summary, and link.",
    date: "2026-01-01",
    url: mediumProfileUrl,
  },
  {
    title: "Add your second article",
    description:
      "Placeholder entry — posts appear here newest first, and each links out to Medium.",
    date: "2026-01-01",
    url: mediumProfileUrl,
  },
];
