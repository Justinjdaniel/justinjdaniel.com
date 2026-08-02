"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      // Instant layout, no GSAP animation
      gsap.set(element.children, { opacity: 1, y: 0 });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          gsap.fromTo(
            element.children,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.25,
              duration: 1,
              ease: "power2.out",
            },
          );
          observer.unobserve(element);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center snap-start py-20">
      <div ref={sectionRef} className="w-full max-w-3xl mx-auto px-6 text-left">
        <h2 className="text-balance text-4xl md:text-4xl font-sans mb-6 text-zinc-900 dark:text-zinc-100">
          About Me
        </h2>
        <p className="text-pretty mb-6 text-base md:text-lg text-zinc-700 dark:text-zinc-300">
          I am a Software Engineer and Full-Stack Developer specializing in
          building high-performance web applications, integrating modern
          Generative AI workflows, architecting scalable digital platforms,
          decentralized applications, and robust web platforms, all built with a
          relentless focus on user experience and real-world impact.
        </p>
        <p className="text-pretty mb-6 text-base md:text-lg text-zinc-700 dark:text-zinc-300">
          With a strong foundation in distributed systems, React, and Web3
          architectures, I bridge the gap between complex backend infrastructure
          and intuitive, user-centric interfaces. My recent work focuses on
          leveraging modern AI frameworks—such as Google Cloud Vertex AI and
          Azure AI—to build smart, data-driven applications that solve
          real-world problems.
        </p>
        <p className="text-pretty text-base md:text-lg text-zinc-700 dark:text-zinc-300">
          I combine engineering rigor with design thinking, rapid prototyping,
          and product analytics to deliver software that scales effortlessly and
          drives measurable user engagement. Always eager to explore emergent AI
          technologies, collaborate on innovative systems, and push the
          boundaries of full-stack engineering.
        </p>
      </div>
    </section>
  );
}
