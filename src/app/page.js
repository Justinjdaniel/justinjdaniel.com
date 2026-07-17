"use client";

// MARK: - Imports
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { useRef } from "react";

import AboutSection from "@/components/sections/about-section";
import HeroSection from "@/components/sections/hero-section";
import GridBackground from "@/components/ui/grid-background";

// MARK: - Config & Constants
gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

// MARK: - Render

/**
 * Render the portfolio entry page with smooth scrolling and snap-aligned sections.
 *
 * @component
 * @returns {import("react").JSX.Element} The portfolio page layout.
 */
export default function Home() {
  const main = useRef(null);

  // In Next.js App Router, global scroll management can be tricky.
  // ScrollSmoother triggers are registered, but smooth scroll initialization
  // is deferred to layout structure adjustments if needed in the future.
  useGSAP(() => {}, []);

  return (
    <div
      ref={main}
      className="overflow-y-scroll h-screen snap-y snap-mandatory scroll-smooth"
      id="smooth-wrapper"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div id="smooth-content">
        <GridBackground className="mt-6 ml-[-25]" />
        <HeroSection />
        <AboutSection />
      </div>
    </div>
  );
}
