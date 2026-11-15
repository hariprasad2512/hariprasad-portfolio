/**
 * The narrow, centered column every page lives in —
 * keeps horizontal rhythm consistent site-wide.
 */
export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-3xl px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
