"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { useRef } from "react";

import AboutSection from "@/components/sections/about-section";
import HeroSection from "@/components/sections/hero-section";
import GridBackground from "@/components/ui/grid-background";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function Home() {
  const main = useRef(null);

  useGSAP(() => {
    // ScrollSmoother requires a wrapper and a content element.
    // However, if we don't have them in the layout, it might fail or behave unexpectedly.
    // In Next.js App Router, global scroll management can be tricky.
    // For now, let's ensure it has the correct structure or disable if not needed.
    // smoother.current = ScrollSmoother.create({
    //   smooth: 2,
    //   effects: true,
    //   smoothTouch: 0.1,
    // });
    // return () => {
    //   if (smoother.current) smoother.current.kill();
    // };
  }, []);

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
