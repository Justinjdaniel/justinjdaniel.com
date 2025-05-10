"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { useRef } from "react";

import AboutSection from "./_components/sections/about-section";
import HeroSection from "./_components/sections/hero-section";
import GridBackground from "./_components/ui/grid-background";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function Home() {
  const main = useRef(null);
  const smoother = useRef(null);

  useGSAP(() => {
    smoother.current = ScrollSmoother.create({
      smooth: 2,
      effects: true,
      smoothTouch: 0.1,
    });
    return () => {
      if (smoother.current) smoother.current.kill();
    };
  }, []);

  return (
    <div
      ref={main}
      className="overflow-y-scroll h-screen snap-y snap-mandatory scroll-smooth"
      id="main-scroll"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <GridBackground className="mt-6 ml-[-25]" />
      <HeroSection />
      <AboutSection />
    </div>
  );
}
