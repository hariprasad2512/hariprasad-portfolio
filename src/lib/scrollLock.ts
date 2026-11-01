let locks = 0;
let previousOverflow = "";

/**
 * Multiple overlays can be open at once (for example the command palette
 * above a case study). Reference-count the body scroll lock so closing one
 * does not unlock the page while another is still open.
 */
export function lockScroll() {
  if (typeof document === "undefined") return () => undefined;

  if (locks === 0) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  locks += 1;

  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks = Math.max(0, locks - 1);
    if (locks === 0) {
      document.body.style.overflow = previousOverflow;
    }
  };
}
