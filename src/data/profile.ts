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
  firstName: "Hari",
  role: "Software Engineer",
  location: "Hyderabad, India",
  availability: "Software Trainee at Helical",
  email: "hprasad887@gmail.com",
  education: "B.Tech CS, IIIT Sri City — 2025",
  // TODO: replace with your real domain — used for canonical URLs and OG images.
  siteUrl: "https://hariprasad.tech",
  description:
    "Hariprasad Anuganti is a Software Engineer from Hyderabad, India, building web, mobile, and AI-powered Solutions.",
  intro:
    "I enjoy untangling complex problems, exploring ideas, and turning them into applications that people love to use. ",
  about: [
    "I graduated in Computer Science from IIIT Sri City in 2025.",
    "Since then, I'm into Software Engineering from the groundup, learnt a lot of things in my Professional Career so far...",
    "I believe, we need to start anything with a WHY.",
    "I genuinely feel, Coding is just a way of Solving Problems in this Digital Era.",
    "Onwards and Upwards!"
  ],
  interests: [
    
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
      url: "https://x.com/harry__psd",
      handle: "@harry__psd",
    },
    {
      id: "medium",
      label: "Medium",
      url: "https://medium.com/@hprasad887",
      handle: "medium.com/@hprasad887",
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
  { href: "/", label: "home" },
  { href: "/experience", label: "experience" },
  { href: "/projects", label: "projects" },
  { href: "/gallery", label: "gallery" },
  { href: "/skills", label: "skills" },
  { href: "/achievements", label: "achievements" },
  { href: "/blog", label: "blog" },
] as const;
