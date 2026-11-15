/**
 * Professional experience — rendered as a vertical timeline.
 * Add, remove, or reorder entries here.
 *
 * Optional `logo`: path (under /public) to a company logo, e.g.
 *   logo: "/logos/keystone.png"
 * Without it, a rounded badge with the company's initials is shown.
 */

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  tech: string[];
  logo?: string;
};

export const experience: ExperienceItem[] = [
  {
    company: "Keystone Robotix",
    role: "Associate Software Engineer",
    period: "Sep 2025 – Jan 2026",
    location: "Hyderabad, India",
    highlights: [
      "Engineered the Unibasket mobile app using Flutter and a Python backend for daily deliveries from verified local vendors.",
      "Contributed to launching Unimatix.io, a cross-platform B2B project management tool using Framework7, Flutter, and CI/CD tools.",
      "Managed concurrent MERN stack client projects, streamlined bug tracking and operations using Azure DevOps, and presented product demos.",
    ],
    tech: ["Flutter", "Python", "Framework7", "MERN", "Azure DevOps"],
  },
  {
    company: "Imaginate XR",
    role: "Development Intern",
    period: "Mar 2025 – Aug 2025",
    location: "Hyderabad, India",
    highlights: [
      "Developed and maintained backend-driven systems for Manaha Clinic to support appointment scheduling and patient workflows.",
      "Deployed a conversational AI kiosk, managing AI context and API integrations for real-time healthcare information.",
      "Improved the user experience of VR-based flight-phobia treatments through usability testing and iterative interface refinements.",
    ],
    tech: ["Backend systems", "AI integrations", "VR/UX"],
  },
];
