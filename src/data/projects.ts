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
    category: "AI",
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
    category: "Misc",
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
      "Personalised Timetable App for College Students, for IIIT Sricity.",
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
      "An offline-first TGSRTC Bus Guide App for Hyderabad City Routes.",
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
    stack: ["React","Python", "Bright Data", "FastAPI",],
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

/**
 * Unique project categories, in first-appearance order. The filter chips
 * on /projects are generated from this, so adding a project with a new
 * category automatically adds a chip for it.
 */
export const projectCategories: string[] = [
  ...new Set(projects.map((project) => project.category)),
];

/** URL slug for a category, e.g. "Cross Platform" -> "cross-platform". */
export const categoryToSlug = (category: string) =>
  category.toLowerCase().replace(/\s+/g, "-");

/**
 * Designated color per category, as Tailwind class groups.
 *   - `soft`:  inactive filter chip — soft bg, tinted border, tinted text
 *   - `solid`: active filter chip — filled color
 *   - `border` / `text`: used individually where a readable backdrop is
 *     needed (e.g. the category chip on a card screenshot)
 * Colors follow the theme's accent convention: mid tone + white text in
 * light mode, lighter tint + near-black text in dark mode. Unmapped
 * categories fall back to neutral.
 */
export type CategoryStyle = {
  soft: string;
  solid: string;
  border: string;
  text: string;
};

export const categoryStyles: Record<string, CategoryStyle> = {
  Web: {
    soft: "border-sky-500/30 bg-sky-500/10 text-sky-800 dark:border-sky-400/30 dark:bg-sky-400/10 dark:text-sky-300",
    solid:
      "border-sky-600 bg-sky-600 text-white dark:border-sky-400 dark:bg-sky-400 dark:text-sky-950",
    border: "border-sky-500/40 dark:border-sky-400/40",
    text: "text-sky-800 dark:text-sky-300",
  },
  Mobile: {
    soft: "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300",
    solid:
      "border-emerald-600 bg-emerald-600 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-emerald-950",
    border: "border-emerald-500/40 dark:border-emerald-400/40",
    text: "text-emerald-800 dark:text-emerald-300",
  },
  AI: {
    soft: "border-violet-500/30 bg-violet-500/10 text-violet-800 dark:border-violet-400/30 dark:bg-violet-400/10 dark:text-violet-300",
    solid:
      "border-violet-600 bg-violet-600 text-white dark:border-violet-400 dark:bg-violet-400 dark:text-violet-950",
    border: "border-violet-500/40 dark:border-violet-400/40",
    text: "text-violet-800 dark:text-violet-300",
  },
  Misc: {
    soft: "border-amber-500/30 bg-amber-500/10 text-amber-800 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300",
    solid:
      "border-amber-600 bg-amber-600 text-white dark:border-amber-400 dark:bg-amber-400 dark:text-amber-950",
    border: "border-amber-500/40 dark:border-amber-400/40",
    text: "text-amber-800 dark:text-amber-300",
  },
};

/** Neutral style for categories without a designated color. */
export const fallbackCategoryStyle: CategoryStyle = {
  soft: "border-border text-muted",
  solid: "border-transparent bg-accent text-accent-foreground",
  border: "border-border",
  text: "text-muted",
};
