"use client";

/**
 * Render a fixed progress bar with an animated gradient at the top of the page.
 */
export default function ScrollProgress() {
  return (
    <div className="fixed top-0 left-0 w-full h-0.5 bg-transparent z-50">
      <div className="scroll-progress-bar w-full h-full origin-left bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_100%] animate-gradient opacity-90" />
    </div>
  );
}
