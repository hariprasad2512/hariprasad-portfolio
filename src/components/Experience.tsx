
import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-10 py-20">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
        Career journey
      </p>

      <h2 className="mt-3 text-3xl font-semibold tracking-tight">
        Where I&apos;ve worked.
      </h2>

      <div className="mt-10 space-y-10">
        {experience.map((item) => (
          <article
            key={`${item.company}-${item.role}`}
            className="grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-[200px_1fr] sm:gap-8"
          >
            <div>
              <p className="text-sm text-slate-500">
                {item.period}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {item.location}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">
                {item.role}
              </h3>

              <p className="mt-1 text-base text-slate-600">
                {item.company}
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
