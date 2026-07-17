"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Reveals child elements with staggered transitions as they enter the viewport.
 *
 * Respects the user's reduced-motion preference by displaying all children immediately.
 *
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Elements to reveal.
 * @param {number} [props.staggerDelay=100] - Delay in milliseconds between each child's reveal.
 * @param {number} [props.threshold=0.1] - Fraction of a child that must be visible to trigger its reveal.
 * @param {string} [props.className=""] - Additional classes for the container.
 * @param {string} [props.childClassName=""] - Additional classes for each child wrapper.
 */
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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    // Feature-detect IntersectionObserver
    if (typeof IntersectionObserver === "undefined") {
      // No IntersectionObserver support - reveal all children immediately
      const childElements = container.children;
      setRevealedIndices(
        new Set(Array.from({ length: childElements.length }, (_, i) => i)),
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Sort entries by their data-index to ensure consistent stagger order
        const intersectingEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const indexA = Number(a.target.getAttribute("data-index"));
            const indexB = Number(b.target.getAttribute("data-index"));
            return indexA - indexB;
          });

        // Apply stagger delay based on position within current batch
        intersectingEntries.forEach((entry, batchPosition) => {
          const index = Number(entry.target.getAttribute("data-index"));
          setTimeout(() => {
            setRevealedIndices((prev) => {
              const next = new Set(prev);
              next.add(index);
              return next;
            });
          }, batchPosition * staggerDelay);
          observer.unobserve(entry.target);
        });
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
  }, [staggerDelay, threshold, prefersReducedMotion]);

  return (
    <div ref={containerRef} className={className}>
      {React.Children.map(children, (child, index) => {
        const isRevealed = prefersReducedMotion || revealedIndices.has(index);
        return (
          <div
            data-index={index}
            className={`transition-all duration-700 ease-out ${childClassName} ${
              isRevealed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
