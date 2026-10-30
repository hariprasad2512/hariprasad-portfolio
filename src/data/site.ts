export const site = {
  name: "Hariprasad Anuganti",
  firstName: "Hariprasad",
  role: "Full-stack developer",
  location: "Hyderabad, India",
  email: "hprasad887@gmail.com",
  github: "https://github.com/hariprasad2512",
  linkedin: "https://linkedin.com/in/hariprasad-anuganti",
  availability: "Open to new work",
};

export const navItems = [
  { id: "top", label: "Index", href: "#top" },
  { id: "work", label: "Work", href: "#work" },
  { id: "path", label: "Path", href: "#path" },
  { id: "about", label: "About", href: "#about" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export type Skill = {
  name: string;
  usedIn: string;
  x: number;
  y: number;
  size: "sm" | "md" | "lg";
};

export const skills: Skill[] = [
  { name: "Python", usedIn: "Spently · Unibasket", x: 6, y: 14, size: "lg" },
  { name: "TypeScript", usedIn: "Lisa · this site", x: 58, y: 8, size: "md" },
  { name: "React", usedIn: "Lisa", x: 34, y: 30, size: "lg" },
  { name: "Next.js", usedIn: "This portfolio", x: 70, y: 26, size: "md" },
  { name: "Django", usedIn: "Spently", x: 4, y: 48, size: "md" },
  { name: "FastAPI", usedIn: "Lisa", x: 46, y: 54, size: "md" },
  { name: "Flutter", usedIn: "Maargam · Unibasket", x: 70, y: 50, size: "lg" },
  { name: "PostgreSQL", usedIn: "Lisa · Spently", x: 16, y: 70, size: "md" },
  { name: "MongoDB", usedIn: "MERN client work", x: 44, y: 78, size: "sm" },
  { name: "Node.js", usedIn: "Unimatix", x: 62, y: 74, size: "sm" },
  { name: "Firebase", usedIn: "Unibasket", x: 78, y: 66, size: "sm" },
  { name: "Dart", usedIn: "Maargam", x: 86, y: 38, size: "sm" },
];
