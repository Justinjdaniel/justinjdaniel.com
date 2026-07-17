"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";

/**
 * Renders the About Me section with viewport-triggered content animations.
 * Respects the user's reduced-motion preference by displaying content immediately.
 * @returns {JSX.Element} The rendered About Me section.
 */
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
          I'm a full stack developer specializing in blockchain technology,
          passionate about transforming complex challenges into innovative,
          forward-thinking solutions. My expertise spans smart contract
          development, decentralized applications, and robust web platforms, all
          built with a relentless focus on user experience and real-world
          impact.
        </p>
        <p className="text-pretty mb-6 text-base md:text-lg text-zinc-700 dark:text-zinc-300">
          Drawing on a strong foundation in design thinking, I leverage detailed
          personas, journey mapping, and rigorous usability testing to guide
          data-driven decisions throughout the product lifecycle. From rapid
          prototyping and high-fidelity wireframing to evidence-based
          validation, I ensure that every solution is both intuitive and
          effective.
        </p>
        <p className="text-pretty text-base md:text-lg text-zinc-700 dark:text-zinc-300">
          With an agile mindset and startup spirit, I collaborate with teams to
          deliver products that drive growth and push the limits of web3 and
          software innovation.
        </p>
      </div>
    </section>
  );
}
