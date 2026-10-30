export type CaseStudy = {
  problem: string;
  approach: string;
  outcome: string;
};

export type Project = {
  number: string;
  slug: string;
  name: string;
  category: string;
  year: string;
  role: string;
  tagline: string;
  description: string;
  stack: string[];
  href?: string;
  githubUrl?: string;
  linkLabel?: string;
  visual: "lisa" | "spently" | "maargam";
  caseStudy: CaseStudy;
};

export const projects: Project[] = [
  {
    number: "01",
    slug: "lisa",
    name: "Lisa",
    category: "AI · Full Stack",
    year: "2025",
    role: "Design & engineering",
    tagline: "A voice you can actually talk to.",
    description:
      "An AI-powered voice assistant combining speech recognition, language models, natural speech, and agentic web search.",
    stack: ["React", "FastAPI", "PostgreSQL", "AI"],
    href: "https://lisa-v2.vercel.app",
    githubUrl: "https://github.com/hariprasad2512/lisa-v2",
    linkLabel: "Live demo",
    visual: "lisa",
    caseStudy: {
      problem:
        "Talking to software still means typing. Most voice interfaces stop at transcription — they can't hold a conversation, look something up, or answer in a voice that sounds human.",
      approach:
        "Built the full speech-to-speech loop: browser speech recognition feeds a FastAPI orchestration layer, which calls a language model with tool access for agentic web search, then streams synthesised speech back to the client. PostgreSQL keeps conversation memory between turns, and the React front end prioritises low-latency streaming over perfect-looking UI.",
      outcome:
        "A working assistant you can interrupt mid-sentence and keep talking to, deployed publicly on Vercel. It validated the architecture end to end: speech in, reasoning with tools, natural speech out.",
    },
  },
  {
    number: "02",
    slug: "spently",
    name: "Spently",
    category: "Web · Personal Finance",
    year: "2024",
    role: "Solo build",
    tagline: "Know where the money went.",
    description:
      "A personal finance tracker for securely recording, categorizing, filtering, and visualizing everyday expenses.",
    stack: ["Python", "Django", "PostgreSQL", "Chart.js"],
    href: "https://spently-app.onrender.com/",
    linkLabel: "Explore Spently",
    visual: "spently",
    caseStudy: {
      problem:
        "Most budgeting tools are either a spreadsheet with extra steps or a black box that decides what your money means. Tracking a daily expense should take seconds, and the data should stay yours.",
      approach:
        "Django and PostgreSQL for authentication, records, and server-side filtering, with a category model that keeps reports consistent instead of relying on free-text tags. Chart.js renders the spend breakdown, and the query layer is written as reusable filters so new views don't duplicate business logic.",
      outcome:
        "A deployed app used for real day-to-day expense tracking, with a clean split between data and presentation and a filtering model that made every later view cheap to add.",
    },
  },
  {
    number: "03",
    slug: "maargam",
    name: "Maargam",
    category: "Mobile · Public Transport",
    year: "2024",
    role: "Product & engineering",
    tagline: "Directions that survive a dead signal.",
    description:
      "An offline-first public transport app designed to help commuters navigate Telangana bus services.",
    stack: ["Flutter", "Dart"],
    visual: "maargam",
    caseStudy: {
      problem:
        "Bus commuters in Telangana rely on memory and word of mouth. The places where you most need route information — on the road, between towns — are exactly where connectivity is worst.",
      approach:
        "An offline-first Flutter architecture: route and timetable data ships with the app, is stored locally, and every search runs on-device. The interaction model favours fast lookups over dense maps, and the interface was sized for low-end Android phones in bright outdoor light.",
      outcome:
        "An app that works with aeroplane mode on, which was the whole point. It also laid the groundwork for live arrival data without changing the offline data model.",
    },
  },
];
