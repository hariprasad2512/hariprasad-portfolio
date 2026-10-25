
export default function Hero() {
  return (
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
  );
}
