
const projects = [
  {
    number: "01",
    name: "Lisa",
    category: "AI · Full Stack",
    description:
      "An AI-powered voice assistant combining speech recognition, language models, natural speech, and agentic web search.",
    stack: ["React", "FastAPI", "PostgreSQL", "AI"],
    href: "https://lisa-v2.vercel.app",
    linkLabel: "View live project",
  },
  {
    number: "02",
    name: "Spently",
    category: "Web · Personal Finance",
    description:
      "A personal finance tracker for securely recording, categorizing, filtering, and visualizing everyday expenses.",
    href: "https://spently-app.onrender.com/",
    stack: ["Python", "Django", "PostgreSQL", "Chart.js"],
    linkLabel: "Explore Spently",
  },
  {
    number: "03",
    name: "Maargam",
    category: "Mobile · Public Transport",
    description:
      "An offline-first public transport app designed to help commuters navigate Telangana bus services.",
    stack: ["Flutter", "Dart"],
    
  },
];

const skills = [
  "Python",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Django",
  "FastAPI",
  "Node.js",
  "Flutter",
  "PostgreSQL",
  "MongoDB",
  "Firebase",
];

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6">
      <header className="flex items-center justify-between border-b border-slate-200 py-6">
        <a href="#" className="text-lg font-bold tracking-tight">
          Hariprasad Anuganti<span className="text-slate-400"></span>
        </a>

        <nav className="flex gap-5 text-sm text-slate-600">
          <a href="#work" className="hover:text-black">Work</a>
          <a href="#about" className="hover:text-black">About</a>
          <a href="#contact" className="hover:text-black">Contact</a>
        </nav>
      </header>

      <section className="py-24 sm:py-32">
        <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Full Stack Developer · Hyderabad, India
        </p>

        <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight sm:text-7xl">
          Building useful products with code.
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
          I&apos;m Hariprasad, a software developer building web and
          mobile applications, backend systems, and AI-powered products.
          I enjoy turning ideas into practical software.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <a
            href="#work"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-700"
          >
            Explore my work ↓
          </a>
          <a
            href="#contact"
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium hover:bg-slate-100"
          >
            Get in touch ↗
          </a>
        </div>
      </section>

      <section id="work" className="scroll-mt-10 py-12">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
          Selected projects
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">
          Things I&apos;ve built.
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.number}
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-slate-400"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  {project.number}
                </span>
                <span className="text-xs text-slate-500">
                  {project.category}
                </span>
              </div>

              <h3 className="mt-8 text-2xl font-semibold">
                {project.name}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block text-sm font-medium underline underline-offset-4"
                >
                  {project.linkLabel} ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

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

        <h3 className="mt-10 text-lg font-semibold">Technologies I work with</h3>
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

      <section id="contact" className="scroll-mt-10 border-t border-slate-200 py-20">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
          Have a project in mind?
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">
          Let&apos;s build something useful.
        </h2>
        <p className="mt-4 max-w-xl leading-7 text-slate-600">
          I&apos;m interested in software engineering opportunities and
          collaborating on useful products.
        </p>

        <div className="mt-7 flex flex-wrap gap-5 text-sm font-medium">
          <a
            href="mailto:hprasad887@gmail.com"
            className="underline underline-offset-4"
          >
            Email me ↗
          </a>
          <a
            href="https://github.com/hariprasad2512"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/hariprasad-anuganti"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            LinkedIn ↗
          </a>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-6 text-sm text-slate-500">
        © 2026 Hariprasad Anuganti. Built with Next.js.
      </footer>
    </main>
  );
}
