import { TechIcon } from "./ui/TechIcon";

/**
 * Tech-stack badges shared by the project cards, the homepage spotlight,
 * and any other place a project's stack is shown.
 */
export default function ProjectStack({
  stack,
  className = "",
}: {
  stack: string[];
  className?: string;
}) {
  return (
    <ul
      className={`flex flex-wrap gap-2 ${className}`}
      aria-label="Technologies used"
    >
      {stack.map((tech) => (
        <li
          key={tech}
          className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-sm text-foreground/90"
        >
          <TechIcon name={tech} />
          {tech}
        </li>
      ))}
    </ul>
  );
}
