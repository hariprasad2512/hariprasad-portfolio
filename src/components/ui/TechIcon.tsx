import type { ComponentType, SVGProps } from "react";
import {
  SiChartdotjs,
  SiDart,
  SiDjango,
  SiFastapi,
  SiFirebase,
  SiFlutter,
  SiFramework7,
  SiGit,
  SiGithubactions,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRender,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiSqlite,
  SiReactHex,
  SiReactbootstrap
} from "@icons-pack/react-simple-icons";

/**
 * Brand icon for a technology name, rendered in its brand color.
 * Technologies without a known mark render no icon (badge stays text-only).
 */
const techIcons: Record<string, ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Python: SiPython,
  FastAPI: SiFastapi,
  Django: SiDjango,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Firebase: SiFirebase,
  Flutter: SiFlutter,
  Dart: SiDart,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  "Chart.js": SiChartdotjs,
  "React Native" : SiReact,
  Git: SiGit,
  "GitHub Actions": SiGithubactions,
  Vercel: SiVercel,
  Render: SiRender,
  Framework7: SiFramework7,
  SQLite3: SiSqlite,
  
};

export function TechIcon({ name }: { name: string }) {
  const Icon = techIcons[name];
  if (!Icon) return null;
  // "default" renders the simple-icons brand color for each mark.
  return <Icon size={14} color="default" aria-hidden="true" />;
}
