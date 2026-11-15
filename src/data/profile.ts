/**
 * Central profile data — the single place to edit identity information.
 */

export type SocialId = "github" | "linkedin" | "x" | "medium" | "email";

export type Social = {
  id: SocialId;
  label: string;
  url: string;
  handle: string;
};

export const profile = {
  name: "Hariprasad Anuganti",
  firstName: "Hariprasad",
  role: "Full-stack developer",
  location: "Hyderabad, India",
  availability: "Open to new work",
  email: "hprasad887@gmail.com",
  education: "B.Tech CS, IIIT Sri City — 2025",
  // TODO: replace with your real domain — used for canonical URLs and OG images.
  siteUrl: "https://hariprasadanuganti.dev",
  description:
    "Hariprasad Anuganti is a full-stack developer from Hyderabad, India, building web, mobile, and AI-powered products.",
  intro:
    "I'm Hariprasad — a full-stack developer building web, mobile, and AI-powered products. I like the part where an idea becomes something people can actually open, tap, and use.",
  about: [
    "I graduated in Computer Science from IIIT Sri City in 2025. Since then I've shipped a delivery app, a B2B project platform, an AI voice assistant, and a few things in between.",
    "My favourite part of the job is the translation step — turning a fuzzy request into a working screen, a clean endpoint, or a model call that behaves. I'd rather ship something small that holds up than something big that only demos well.",
  ],
  interests: [
    { label: "Developer tools", note: "Editors, CLIs, and tiny automations." },
    { label: "AI interfaces", note: "Making models feel less like a console." },
    { label: "Offline-first software", note: "Things that keep working without signal." },
    { label: "Typography", note: "Serif italics and generous spacing." },
  ],
  // TODO: X and Medium URLs are placeholders — replace with your real profiles.
  socials: [
    {
      id: "github",
      label: "GitHub",
      url: "https://github.com/hariprasad2512",
      handle: "github.com/hariprasad2512",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      url: "https://linkedin.com/in/hariprasad-anuganti",
      handle: "in/hariprasad-anuganti",
    },
    {
      id: "x",
      label: "X (Twitter)",
      url: "https://x.com/your-handle",
      handle: "@your-handle",
    },
    {
      id: "medium",
      label: "Medium",
      url: "https://medium.com/@your-handle",
      handle: "medium.com/@your-handle",
    },
    {
      id: "email",
      label: "Email",
      url: "mailto:hprasad887@gmail.com",
      handle: "hprasad887@gmail.com",
    },
  ] as Social[],
};

export const navLinks = [
  { href: "/experience", label: "experience" },
  { href: "/projects", label: "projects" },
  { href: "/gallery", label: "gallery" },
  { href: "/skills", label: "skills" },
  { href: "/achievements", label: "achievements" },
  { href: "/blog", label: "blog" },
] as const;
