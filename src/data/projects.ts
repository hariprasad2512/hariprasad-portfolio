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
      "A modern, AI-powered full-stack Voice Assistant.",
    stack: ["React", "FastAPI", "PostgreSQL", "AI"],
    href: "https://lisa-v2.vercel.app",
    githubUrl: "https://github.com/hariprasad2512/lisa-v2",
    linkLabel: "Try Lisa",
    featured: true,
    image: "/projects/lisa.png"
  },
  {
    number: "02",
    name: "Clarity",
    category: "Cross Platform",
    description:
      "Open-Source Apple Reminders Alternative, runs on macOS, Windows and Android.",
    githubUrl: "https://github.com/hariprasad2512/clarity_flutter",
    href: "https://hariprasad2512.github.io/clarity-app/",
    stack: ["Flutter", "Supabase", "PostgreSQL"],
    linkLabel: "Try Clarity Now!",
    featured: true,
    image: "/projects/clarity.png"
  },
  
  {
    number: "03",
    name: "nextClass",
    category: "Mobile",
    description:
      "Personalised Timetable App for College Students, for IIIT Sricity",
    stack: ["Flutter", "Dart", "Firebase"],
    githubUrl: "https://github.com/hariprasad2512/next_class",
    href : "https://play.google.com/store/apps/details?id=com.harry.next_class",
    linkLabel: "Download Now",
    featured: true,
    image: "/projects/nextClass.png"
  },
  {
    number: "04",
    name: "Maargam",
    category: "Mobile",
    description:
      "An offline-first TGSRTC Bus Guide App",
    stack: ["React Native", "Python", "SQLite3"],
    githubUrl: "https://github.com/hariprasad2512/margam-ts-bus-guide",
    href: "https://play.google.com/store/apps/details?id=com.hpsdstudio.maargam",
    featured: true,
    linkLabel: "Download Now",
    image: "/projects/maargam.png"
  },

  {
    number: "05",
    name: "Open Events",
    category: "Web",
    description:
      "City Events Aggregator using Bright Data Web Scraper",
    githubUrl: "https://github.com/hariprasad2512/open-events",
    href: "https://open-events.vercel.app/",
    stack: ["Python", "Django", "PostgreSQL", "Chart.js"],
    linkLabel: "Check OpenEvents",
    image: "/projects/open-events.png"
  },
  {
    number: "06",
    name: "Spently",
    category: "Web",
    description:
      "A personal finance tracker for securely recording, categorizing, filtering, and visualizing everyday expenses.",
    githubUrl: "https://github.com/hariprasad2512/spently-app",
    href: "https://spently-app.onrender.com/",
    stack: ["Python", "Django", "PostgreSQL", "Chart.js"],
    linkLabel: "Explore Spently",
    featured: true,
    image: "/projects/spently.png"
  },



];
