"use client";

import { useEffect, useState } from "react";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setVisible(!entry.isIntersecting);
        }
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" },
    );

    // Observe a point 100px from the top
    const target = document.createElement("div");
    target.style.position = "absolute";
    target.style.top = "100px";
    target.style.height = "1px";
    target.style.width = "1px";
    document.body.appendChild(target);
    observer.observe(target);

    return () => {
      observer.disconnect();
      target.remove();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={`
        !fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9999]
        flex items-center justify-center p-2
        bg-zinc-100/80 dark:bg-zinc-800/80
        border border-black/[0.1] dark:border-white/[0.1]
        rounded-full
        text-zinc-900 dark:text-zinc-100
        shadow-md backdrop-blur-sm
        transition-all duration-300 ease-out
        hover:bg-indigo-500 hover:text-white hover:scale-105
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        role="img"
        aria-labelledby="backToTopTitle"
      >
        <title id="backToTopTitle">Arrow pointing upwards</title>
        <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}
