"use client";

import React, { useEffect, useRef, useState } from "react";

export default function ScrollReveal({
  children,
  staggerDelay = 100, // delay in ms per item
  threshold = 0.1,
  className = "",
  childClassName = "",
}) {
  const containerRef = useRef(null);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasObserver, setHasObserver] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);

    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      setHasObserver(true);
    }

    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !hasObserver) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let batchIndex = 0;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            const currentBatchIndex = batchIndex;
            setTimeout(() => {
              setRevealedIndices((prev) => {
                const next = new Set(prev);
                next.add(index);
                return next;
              });
            }, currentBatchIndex * staggerDelay);
            batchIndex++;
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" },
    );

    const childElements = container.children;
    for (let i = 0; i < childElements.length; i++) {
      observer.observe(childElements[i]);
    }

    return () => {
      observer.disconnect();
    };
  }, [staggerDelay, threshold, prefersReducedMotion, hasObserver]);

  return (
    <div ref={containerRef} className={className}>
      {React.Children.map(children, (child, index) => {
        // If the API is not supported or prefers-reduced-motion is active, render normally without hidden states or animations.
        const bypassAnimation = !hasObserver || prefersReducedMotion;
        const isRevealed = bypassAnimation || revealedIndices.has(index);

        return (
          <div
            data-index={index}
            className={`${childClassName} ${
              bypassAnimation
                ? "opacity-100 translate-y-0"
                : `transition-all duration-700 ease-out ${
                    isRevealed
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`
            }`}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
