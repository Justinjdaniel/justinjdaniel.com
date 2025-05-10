import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge tailwind classes and regular class names.
 * It uses the `clsx` and `twMerge` functions from the `clsx` and `tailwind-merge` libraries.
 *
 * @param {...string} inputs - The class names to merge.
 * @return {string} The merged class names.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
