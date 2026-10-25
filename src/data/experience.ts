
export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
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
  },
];
