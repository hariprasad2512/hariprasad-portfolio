import Reveal from "./Reveal";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

/** Consistent masthead for the dedicated detail pages. */
export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <Reveal>
      <header className="pb-12 pt-14 sm:pb-14 sm:pt-20">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-prose leading-relaxed text-muted">
            {description}
          </p>
        ) : null}
      </header>
    </Reveal>
  );
}
