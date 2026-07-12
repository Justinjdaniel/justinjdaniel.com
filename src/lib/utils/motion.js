/**
 * Checks if the user has requested reduced motion on their OS or browser.
 * Safe to call in both SSR and client environments.
 *
 * @returns {boolean} True if prefers-reduced-motion is active, false otherwise.
 */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
