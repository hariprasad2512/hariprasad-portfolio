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

export const quoraProfileUrl =
  "https://www.quora.com/profile/Hariprasad-Anuganti-1";

export const blogPosts: BlogPost[] = [
  {
    title: "Quick AI Checklist (if 2 or more, you should read this).",
    description:
      "TRUST HUMANS. Humans built AI, not the other way around.",
    date: "2026-11-02",
    url: "https://www.linkedin.com/pulse/quick-ai-checklist-2-more-you-should-read-hariprasad-anuganti-zvj8f",
  },
  
  {
    title: "Never Neglect SQL and Here’s Why It's Underrated… An SDE Perspective.",
    description:
      "SQL is embedded in every application you use (be it Instagram, YouTube, Google, Amazon), in countless ways possible.",
    date: "2026-09-09",
    url: "https://medium.com/@hprasad887/never-neglect-sql-and-heres-why-its-underrated-an-sde-perspective-269b6ba5137f?sharedUserId=hprasad887",
  },
  {
    title: "Quitting Social Media doesn’t work… Here’s why… and what to do instead?",
    description:
"Tens of millions of people around the world are hopelessly addicted to Social Media, in search of Instant Gratification through apps like Instagram, Facebook, X (formerly Twitter) and so on.",
    date: "2025-11-25",
    url: "https://medium.com/@hprasad887/quitting-social-media-doesnt-work-here-s-why-and-what-to-do-instead-f3703b73e72b?sharedUserId=hprasad887",
  },

  {
    title: "What is the most challenging aspect of reading?",
    description:
"there are many other Challenging aspects of Reading, which if you overcome, you will be able to cruise through a book within no time…They are as follows",
    date: "2021-02-25",
    url: "https://qr.ae/pFEr8f",
  },

  {
    title: "Do's and Don'ts as a Teenager",
    description:
"A Simple Guide to taking use of Teenage for a better version of yourself in the future...(Based on my Personal Experiences)",
    date: "2022-04-15",
    url: 
  "https://field-hygienic-e36.notion.site/Do-s-and-Don-ts-for-a-Teenager-fded3f9546924cd3985783626b4f8a19"
    ,
  },


  {
    title: "Why is it important to read literature nowadays?",
    description:
"Books are Repositories of Knowledge…Reading Literature has many uplifting benefits for the human kind since ages…",
    date: "2021-01-02",
    url: "https://qr.ae/pFZ1vN",
  },


  





];
