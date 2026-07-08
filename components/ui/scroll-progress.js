"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const progressRef = useRef(null);

  useEffect(() => {
    const updateProgress = () => {
      if (!progressRef.current) return;

      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = Math.min(scrolled / documentHeight, 1);

      progressRef.current.style.transform = `scaleX(${progress})`;
    };

    if ("AnimationTimeline" in window) {
      const scrollTimeline = new ScrollTimeline({
        source: document.documentElement,
        axis: "block",
        scrollOffsets: [CSS.percent(0), CSS.percent(100)],
      });

      progressRef.current?.animate(
        { transform: ["scaleX(0)", "scaleX(1)"] },
        {
          duration: 1,
          fill: "forwards",
          timeline: scrollTimeline,
        },
      );
    } else {
      document.addEventListener(
        "scroll",
        () => {
          requestAnimationFrame(updateProgress);
        },
        { passive: true },
      );
      updateProgress();
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-0.5 bg-transparent z-50">
      <div
        ref={progressRef}
        className="w-full h-full origin-left bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_100%] animate-gradient opacity-90 transition-transform ease-out duration-100"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
