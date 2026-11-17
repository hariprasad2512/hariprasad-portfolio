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
    company: "Helical IT Solutions",
    role: "Software Trainee",
    period: "Oct 2026 - Present",
    location: "Hyderabad, India",
    highlights: [
      "Junior Frontend Engineer working for Helical Insight, an open-source Business Intelligence Platform",
      
    ],
    tech: ["React", "JavaScript","Ant-D", "Test Driven Development", ],
    logo: "/logos/helical.jpeg"

  },
  {
    company: "Rammina Dev & Design",
    role: "Full Stack Developer Intern",
    period: "Aug 2026 - Oct 2026",
    location: "Remote",
    highlights: [
      "Worked on diverse Full Stack Applications, with a clear cut understanding on the underlying Architecture, and the end-to-end functionality.",
      
    ],
    tech: ["HTML","CSS", "JavaScript","React","Python", "FastAPI","Django"],
    logo: "/logos/rammina.jpeg"
  },
  {
    company: "Keystone Robotix",
    role: "Associate Software Engineer",
    period: "Sep 2025 – Jan 2026",
    location: "Hyderabad, India",
    highlights: [
      "Engineered the Unibasket mobile app using Flutter and a Python backend for daily deliveries from verified local vendors.",
      "Contributed to launching Unimatix.io, a cross-platform B2B project management tool using Framework7, Flutter, and CI/CD tools.",
    ],
    tech: ["Flutter", "Python", "Framework7", "MERN", "Azure DevOps"],
    logo:"/logos/keystone-robotix.jpeg"
  },
  {
    company: "Imaginate | AI+XR",
    role: "Development Intern",
    period: "Mar 2025 – Aug 2025",
    location: "Hyderabad, India",
    highlights: [
      "Deployed a conversational AI kiosk, managing AI context and API integrations for real-time healthcare information.",
      "Improved the user experience of VR-based flight-phobia treatments through usability testing and iterative interface refinements.",
    ],
    tech: ["Virtual Reality", "AI", "XR", ],
    logo: "/logos/imaginate.jpeg"
  },
  {
    company: "Transvolt Mobility Pvt Ltd",
    role: "SDE Intern",
    period: "May 2024 – July 2024",
    location: "Mumbai, India",
    highlights: [
      "Developed a EV Bus Fleet Management platform for managing daily operations across 50+ electric buses in Mira Bhaindar, Mumbai.",
      "Implemented digital workflows that reduced manual fleet logging effort by 70%, saving an estimated 20 hours per week."
    ],
    tech: ["Flutter", "REST API", "Django", "Firebase"],
    logo: "/logos/transvolt.jpeg"
  },
];
