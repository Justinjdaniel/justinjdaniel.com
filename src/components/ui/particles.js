"use client";
import { useEffect, useRef, useState } from "react";
import { useMousePosition } from "@/lib/utils/mouse";

/**
 * Renders a high-performance particle effect on a canvas.
 * Optimized for zero-allocation animation loop, reduced motion,
 * tab inactivity pausing, and memory leak prevention.
 *
 * @param {Object} props - The properties for the Particles component.
 * @param {string} [props.className=""] - The CSS class name for the container div.
 * @param {number} [props.quantity=30] - The number of particles to render.
 * @param {number} [props.staticity=50] - The staticity of the particles.
 * @param {number} [props.ease=50] - The ease of the particles.
 * @param {boolean} [props.refresh=false] - Whether to refresh the particles.
 * @return {JSX.Element} The Particles component.
 */
export default function Particles({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
}) {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const context = useRef(null);
  const circles = useRef([]);
  const mousePosition = useMousePosition();
  const mouse = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const animationFrameId = useRef(null);
  const prefersReducedMotion = useRef(false);

  const [colorScheme, setColorScheme] = useState(
    typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setColorScheme(media.matches ? "dark" : "light");
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional, useEffect is stable
  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }

    if (typeof window !== "undefined" && window.matchMedia) {
      prefersReducedMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
    }

    initCanvas();

    if (!prefersReducedMotion.current) {
      animate();
    }

    window.addEventListener("resize", initCanvas);

    return () => {
      window.removeEventListener("resize", initCanvas);
      if (animationFrameId.current) {
        window.cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional, useEffect is stable
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId.current) {
          window.cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
      } else {
        if (!animationFrameId.current && !prefersReducedMotion.current) {
          animate();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional, onMouseMove is stable
  useEffect(() => {
    onMouseMove();
  }, [mousePosition.x, mousePosition.y]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional, initCanvas is stable
  useEffect(() => {
    initCanvas();
  }, [refresh]);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const onMouseMove = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = mousePosition.x - rect.left - w / 2;
      const y = mousePosition.y - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    }
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  };

  const circleParams = () => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const size = Math.floor(Math.random() * 2) + 0.1;
    const alpha = 0;
    const targetAlpha = Math.random() * 0.6 + 0.1;
    const dx = (Math.random() - 0.5) * 0.2;
    const dy = (Math.random() - 0.5) * 0.2;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      translateX,
      translateY,
      size,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  };

  const resetCircle = (circle) => {
    circle.x = Math.floor(Math.random() * canvasSize.current.w);
    circle.y = Math.floor(Math.random() * canvasSize.current.h);
    circle.translateX = 0;
    circle.translateY = 0;
    circle.size = Math.floor(Math.random() * 2) + 0.1;
    circle.alpha = 0;
    circle.targetAlpha = Math.random() * 0.6 + 0.1;
    circle.dx = (Math.random() - 0.5) * 0.2;
    circle.dy = (Math.random() - 0.5) * 0.2;
    circle.magnetism = 0.1 + Math.random() * 4;
  };

  const drawCircle = (circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      const color =
        colorScheme === "dark"
          ? `rgba(255,255,255,${alpha})` // white for dark mode
          : `rgba(0,0,0,${alpha})`; // black for light mode

      context.current.fillStyle = color;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circles.current.push(circle);
      }
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h,
      );
    }
  };

  const drawParticles = () => {
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  };

  const remapValue = (value, start1, end1, start2, end2) => {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const animate = () => {
    clearContext();
    const len = circles.current.length;
    for (let i = 0; i < len; i++) {
      const circle = circles.current[i];

      // Handle the alpha value: avoid array allocations & reduce
      const edgeLeft = circle.x + circle.translateX - circle.size;
      const edgeRight =
        canvasSize.current.w - circle.x - circle.translateX - circle.size;
      const edgeTop = circle.y + circle.translateY - circle.size;
      const edgeBottom =
        canvasSize.current.h - circle.y - circle.translateY - circle.size;
      const closestEdge = Math.min(edgeLeft, edgeRight, edgeTop, edgeBottom);

      const remapClosestEdge = remapValue(closestEdge, 0, 20, 0, 1);
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      circle.x += circle.dx;
      circle.y += circle.dy;
      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
        ease;
      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
        ease;

      // circle gets out of the canvas: reset in-place to avoid array splicing & object allocation
      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        resetCircle(circle);
        drawCircle(circle, true);
      } else {
        // Pass the circle directly without object cloning
        drawCircle(circle, true);
      }
    }
    animationFrameId.current = window.requestAnimationFrame(animate);
  };

  return (
    <div className={className} ref={canvasContainerRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
