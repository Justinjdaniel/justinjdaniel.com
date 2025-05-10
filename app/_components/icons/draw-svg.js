"use client";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { cloneElement, useEffect, useRef } from "react";

gsap.registerPlugin(DrawSVGPlugin);

export default function DrawSVG({
  children,
  className = "",
  duration = 1,
  stagger = 0.12,
  delay = 0,
  ...props
}) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const paths = svgRef.current.querySelectorAll("path");
    if (!paths.length) return;

    gsap.set(paths, { drawSVG: "0%" });
    gsap.to(paths, {
      drawSVG: "100%",
      duration,
      stagger,
      delay,
      ease: "power1.out",
    });
  }, [duration, stagger, delay]);

  // Ensure only one child (the SVG)
  const svgChild = Array.isArray(children) ? children[0] : children;

  return svgChild
    ? cloneElement(svgChild, {
        ref: svgRef,
        className: [svgChild.props.className, className]
          .filter(Boolean)
          .join(" "),
        ...props,
      })
    : null;
}
