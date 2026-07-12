"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextPlugin } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(TextPlugin);

/**
 * TypingText Component
 * @param {string} text - The text to be typed out
 * @param {string} className - Additional class names for styling
 * @param {number} speed - Typing speed in seconds
 * @param {string} as - The HTML element to render (default: "span")
 * @param {boolean} start - Whether to start the typing effect immediately
 * @param {function} onComplete - Callback function when typing is complete
 * @param {boolean} typing - Whether to show a typing cursor
 * @returns {JSX.Element} - A span element with typing effect.
 */
export default function TypingText({
  text,
  className = "",
  speed = 2,
  as: Tag = "span",
  start = true,
  onComplete,
  typing = false,
}) {
  const textRef = useRef(null);

  useGSAP(() => {
    if (start && textRef.current) {
      textRef.current.textContent = "";
      gsap.to(textRef.current, {
        duration: speed,
        text: text,
        ease: "none",
        delay: 0.2,
        onComplete,
      });
    }
  }, [text, speed, start]);

  return (
    <Tag
      ref={textRef}
      className={`${className} ${typing ? "typing-cursor" : ""}`}
      aria-label={text}
    />
  );
}
