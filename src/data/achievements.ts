/**
 * Achievements — hackathons, certifications, academic milestones,
 * published apps, and other wins.
 *
 * TODO: These two entries are placeholders so the page structure is
 * visible. Replace them with real achievements (and add more).
 */

export type AchievementCategory =
  | "Hackathon"
  | "Certification"
  | "Academic"
  | "Publication"
  | "Other";

export type Achievement = {
  title: string;
  description: string;
  category: AchievementCategory;
  year?: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    title: "Add your first achievement",
    description:
      "Placeholder entry — edit src/data/achievements.ts to add a hackathon win, certification, or milestone.",
    category: "Hackathon",
  },
  {
    title: "Add your second achievement",
    description:
      "Placeholder entry — real entries can link to a certificate, Devpost project, or Play Store listing.",
    category: "Certification",
  },
];
