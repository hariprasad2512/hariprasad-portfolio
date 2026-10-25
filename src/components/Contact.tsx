
export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-10 border-t border-slate-200 py-20"
    >
      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
        Have a project in mind?
      </p>

      <h2 className="mt-3 text-3xl font-semibold tracking-tight">
        Let&apos;s build something useful.
      </h2>

      <p className="mt-4 max-w-xl leading-7 text-slate-600">
        I&apos;m interested in software engineering opportunities
        and collaborating on useful products.
      </p>

      <div className="mt-7 flex flex-wrap gap-5 text-sm font-medium">
        <a href="mailto:hprasad887@gmail.com"
          className="underline underline-offset-4">
          Email me ↗
        </a>
        <a href="https://github.com/hariprasad2512"
          target="_blank" rel="noreferrer"
          className="underline underline-offset-4">
          GitHub ↗
        </a>
        <a href="https://linkedin.com/in/hariprasad-anuganti"
          target="_blank" rel="noreferrer"
          className="underline underline-offset-4">
          LinkedIn ↗
        </a>
      </div>
    </section>
  );
}
