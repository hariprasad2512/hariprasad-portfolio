/**
 * Projects. `featured: true` entries appear in the home-page teaser
 * (first two featured ones are shown); the Projects page lists all.
 *
 * Optional fields:
 *   - `image`: path (under /public) to a screenshot — until then the
 *     card shows a clearly marked placeholder.
 *   - `date`: display string, e.g. "Aug 2026".
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
  date?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    number: "01",
    name: "Lisa",
    category: "AI · Full Stack",
    description:
      "An AI-powered voice assistant combining speech recognition and language models",
    stack: ["React", "FastAPI", "PostgreSQL", "AI"],
    href: "https://lisa-v2.vercel.app",
    githubUrl: "https://github.com/hariprasad2512/lisa-v2",
    linkLabel: "Live demo",
    featured: true,
    image: "/projects/lisa.png"
  },
  
  {
    number: "02",
    name: "Open Events",
    category: "Web · Events",
    description:
      "City Events Aggregator using Bright Data Web Scraper",
    githubUrl: "https://github.com/hariprasad2512/open-events",
    href: "https://open-events.vercel.app/",
    stack: ["Python", "Django", "PostgreSQL", "Chart.js"],
    linkLabel: "Check OpenEvents",
    featured: true,
    image: "/projects/open-events.png"
  },
  {
    number: "03",
    name: "Spently",
    category: "Web · Personal Finance",
    description:
      "A personal finance tracker for securely recording, categorizing, filtering, and visualizing everyday expenses.",
    githubUrl: "https://github.com/hariprasad2512/spently-app",
    href: "https://spently-app.onrender.com/",
    stack: ["Python", "Django", "PostgreSQL", "Chart.js"],
    linkLabel: "Explore Spently",
    featured: true,
    image: "/projects/spently.png"
  },
  {
    number: "04",
    name: "Maargam",
    category: "Mobile · Public Transport",
    description:
      "An offline-first public transport app designed to help commuters navigate Telangana bus services.",
    stack: ["Flutter", "Dart"],
    featured: true,
  },
];
