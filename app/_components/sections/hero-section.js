"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import Link from "next/link";
import { useRef, useState } from "react";
import TypingText from "../effects/typing-text";

gsap.registerPlugin(SplitText);

export default function HeroSection() {
  const headingRef = useRef(null);
  const buttonsRef = useRef(null);

  // Animation control states
  const [typingStart, setTypingStart] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingDone, setTypingDone] = useState(false);

  // Animate heading and trigger typing
  useGSAP(() => {
    const splitHeading = new SplitText(headingRef.current, {
      type: "chars,words,lines",
    });

    const tl = gsap.timeline({
      defaults: { ease: "back.out(1.7)" },
      onComplete: () => splitHeading.revert(),
    });

    tl.from(splitHeading.chars, {
      opacity: 0,
      y: 50,
      rotateX: -90,
      stagger: 0.02,
      duration: 1,
    }).add(() => {
      setTypingStart(true);
      setIsTyping(true);
    });

    return () => splitHeading.revert();
  }, []);

  // Animate buttons after typing is done
  useGSAP(() => {
    if (typingDone && buttonsRef.current) {
      gsap.fromTo(
        buttonsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1.2,
          ease: "power2.out",
        },
      );
    }
  }, [typingDone]);

  return (
    <section className="relative min-h-screen flex items-center justify-center p-8 max-w-[100ch] mx-auto snap-start">
      <div className="max-w-5xl mx-auto text-center">
        <h1
          ref={headingRef}
          className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500"
        >
          Fullstack Developer & Data Analytics Enthusiast
        </h1>
        <TypingText
          as="p"
          text="Building the future of Web3 with innovative, user-centric, data-driven solutions."
          className="font-mono text-xl md:text-2xl dark:text-zinc-400 text-zinc-600 mb-8"
          speed={2.5}
          start={typingStart}
          typing={isTyping}
          onComplete={() => {
            setIsTyping(false);
            setTypingDone(true);
          }}
        />
        <div ref={buttonsRef} className="flex gap-4 justify-center">
          <Link
            href="/blog"
            style={{ opacity: 0 }}
            className="px-8 py-3 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-all hover:scale-105"
          >
            Explore My Work
          </Link>
          <a
            href="#contact"
            style={{ opacity: 0 }}
            className="px-8 py-3 rounded-full border border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
