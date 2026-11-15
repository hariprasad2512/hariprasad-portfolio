/**
 * Technical skills, grouped by category. Edit freely — the Skills
 * section renders whatever lives here.
 */

export type SkillCategoryId =
  | "languages"
  | "frontend"
  | "backend"
  | "mobile"
  | "databases"
  | "tools";

export type SkillCategory = {
  id: SkillCategoryId;
  label: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Programming Languages",
    skills: ["Python", "TypeScript", "JavaScript", "Dart"],
  },
  {
    id: "frontend",
    label: "Frontend Development",
    skills: ["React", "Next.js", "Tailwind CSS", "Framework7"],
  },
  {
    id: "backend",
    label: "Backend Development",
    skills: ["FastAPI", "Django", "Node.js"],
  },
  {
    id: "mobile",
    label: "Mobile Development",
    skills: ["Flutter"],
  },
  {
    id: "databases",
    label: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Firebase"],
  },
  {
    id: "tools",
    label: "Developer Tools & Platforms",
    skills: ["Git", "GitHub Actions", "Azure DevOps", "Vercel", "Render"],
  },
];

/** Flattened list, used for the compact home-page teaser. */
export const allSkills: string[] = skillCategories.flatMap((c) => c.skills);
