/**
 * Projects. `featured: true` entries appear in the home-page teaser
 * (first three featured ones are shown); the Projects page lists all.
 * Optional `image` can point to a screenshot under /public.
 */

export type Project = {
  number: string;
  name: string;
  category: string;
  description: string;
  stack: string[];
  href?: string;
  githubUrl?: string;
  linkLabel?: string;
  image?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    number: "01",
    name: "Lisa",
    category: "AI · Full Stack",
    description:
      "An AI-powered voice assistant combining speech recognition, language models, natural speech, and agentic web search.",
    stack: ["React", "FastAPI", "PostgreSQL", "AI"],
    href: "https://lisa-v2.vercel.app",
    githubUrl: "https://github.com/hariprasad2512/lisa-v2",
    linkLabel: "Live demo",
    featured: true,
  },
  {
    number: "02",
    name: "Spently",
    category: "Web · Personal Finance",
    description:
      "A personal finance tracker for securely recording, categorizing, filtering, and visualizing everyday expenses.",
    href: "https://spently-app.onrender.com/",
    stack: ["Python", "Django", "PostgreSQL", "Chart.js"],
    linkLabel: "Explore Spently",
    featured: true,
  },
  {
    number: "03",
    name: "Maargam",
    category: "Mobile · Public Transport",
    description:
      "An offline-first public transport app designed to help commuters navigate Telangana bus services.",
    stack: ["Flutter", "Dart"],
    featured: true,
  },
];
