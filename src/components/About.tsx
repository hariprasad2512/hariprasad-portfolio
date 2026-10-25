
const skills = [
  "Python", "JavaScript", "TypeScript", "React",
  "Next.js", "Django", "FastAPI", "Node.js",
  "Flutter", "PostgreSQL", "MongoDB", "Firebase",
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-10 py-20">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
        A little about me
      </p>

      <h2 className="mt-3 text-3xl font-semibold tracking-tight">
        From idea to implementation.
      </h2>

      <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
        I graduated in Computer Science from IIIT Sri City in 2025.
        My experience spans software development, mobile applications,
        backend APIs, and AI integrations. I enjoy learning how systems
        work and building products that solve real problems.
      </p>

      <h3 className="mt-10 text-lg font-semibold">
        Technologies I work with
      </h3>

      <div className="mt-5 flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
