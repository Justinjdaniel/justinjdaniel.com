"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.25,
          duration: 1,
          ease: "power2.out",
        },
      );
    }
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center snap-start">
      <div
        ref={sectionRef}
        className="w-full max-w-3xl mx-auto px-6 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
          About Me
        </h2>
        <p className="mb-6 text-lg md:text-xl text-zinc-700 dark:text-zinc-300">
          I' m a full stack developer specializing in blockchain technology,
          with a passion for building user-centric and innovative digital
          solutions. My expertise spans smart contract development,
          decentralized applications, and robust web platforms that empower
          users and drive meaningful impact.
        </p>
        <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300">
          I thrive on solving complex challenges at the intersection of
          technology and usability. Whether architecting secure blockchain
          protocols or designing seamless user experiences, I' m dedicated to
          pushing the boundaries of what' s possible in the web3 and software
          landscape.
        </p>
      </div>
    </section>
  );
}
