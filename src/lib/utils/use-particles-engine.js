"use client";

// MARK: - Imports
import { useCallback, useEffect, useRef, useState } from "react";
import { useMousePosition } from "@/lib/utils/mouse";
import {
  createCircleParams,
  remapValue,
  resetCircleInPlace,
} from "@/lib/utils/particles-engine";

// MARK: - Custom Hook

/**
 * Custom hook encapsulating the high-performance canvas particles engine logic.
 * Manages resizing, particle initialization, tracking mouse coordinates,
 * updating coordinates, and executing the zero-allocation animation loop.
 *
 * @param {Object} params - The configuration options for the engine.
 * @param {import("react").RefObject<HTMLCanvasElement|null>} params.canvasRef - Ref to the canvas element.
 * @param {import("react").RefObject<HTMLDivElement|null>} params.canvasContainerRef - Ref to the parent container element.
 * @param {number} params.quantity - Number of particles to render.
 * @param {number} params.staticity - Controls the sensitivity of particle movement response to mouse.
 * @param {number} params.ease - Animation ease multiplier.
 * @param {boolean} params.refresh - Trigger to re-initialize particles.
 * @returns {void}
 */
export function useParticlesEngine({
  canvasRef,
  canvasContainerRef,
  quantity,
  staticity,
  ease,
  refresh,
}) {
  const context = useRef(null);
  const circles = useRef([]);
  const mousePosition = useMousePosition();
  const mouse = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const animationFrameId = useRef(null);
  const prefersReducedMotion = useRef(false);
  const animateRef = useRef(null);
  const tickRef = useRef(() => {
    if (animateRef.current) {
      animateRef.current();
    }
  });

  const [colorScheme, setColorScheme] = useState(
    typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  );

  const staticityRef = useRef(staticity);
  const easeRef = useRef(ease);
  const colorSchemeRef = useRef(colorScheme);

  // Sync state values with refs for zero-allocation tick reference stability
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setColorScheme(media.matches ? "dark" : "light");
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    staticityRef.current = staticity;
    easeRef.current = ease;
    colorSchemeRef.current = colorScheme;
  }, [staticity, ease, colorScheme]);

  // Handle canvas resize
  const resizeCanvas = useCallback(() => {
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
  }, [canvasRef, canvasContainerRef, dpr]);

  // Clear canvas context
  const clearContext = useCallback(() => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h,
      );
    }
  }, []);

  // Draw a particle circle
  const drawCircle = useCallback(
    (circle, update = false) => {
      if (context.current) {
        const { x, y, translateX, translateY, size, alpha } = circle;
        context.current.translate(translateX, translateY);
        context.current.beginPath();
        context.current.arc(x, y, size, 0, 2 * Math.PI);
        const color =
          colorSchemeRef.current === "dark"
            ? `rgba(255,255,255,${alpha})`
            : `rgba(0,0,0,${alpha})`;

        context.current.fillStyle = color;
        context.current.fill();
        context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

        if (!update) {
          circles.current.push(circle);
        }
      }
    },
    [dpr],
  );

  // Draw initial batch of particles
  const drawParticles = useCallback(() => {
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = createCircleParams(
        canvasSize.current.w,
        canvasSize.current.h,
      );
      drawCircle(circle);
    }
  }, [quantity, drawCircle, clearContext]);

  const initCanvas = useCallback(() => {
    resizeCanvas();
    drawParticles();
  }, [resizeCanvas, drawParticles]);

  // Update mouse position inside boundary
  const onMouseMove = useCallback(() => {
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
  }, [canvasRef, mousePosition.x, mousePosition.y]);

  // Main animation engine tick
  const animate = useCallback(() => {
    clearContext();
    const len = circles.current.length;
    for (let i = 0; i < len; i++) {
      const circle = circles.current[i];

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
        (mouse.current.x / (staticityRef.current / circle.magnetism) -
          circle.translateX) /
        easeRef.current;
      circle.translateY +=
        (mouse.current.y / (staticityRef.current / circle.magnetism) -
          circle.translateY) /
        easeRef.current;

      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        resetCircleInPlace(circle, canvasSize.current.w, canvasSize.current.h);
        drawCircle(circle, true);
      } else {
        drawCircle(circle, true);
      }
    }
    animationFrameId.current = window.requestAnimationFrame(tickRef.current);
  }, [drawCircle, clearContext]);

  // Setup canvas, listeners, and animation loop
  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }

    if (typeof window !== "undefined" && window.matchMedia) {
      prefersReducedMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
    }

    animateRef.current = animate;

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
  }, [canvasRef, initCanvas, animate]);

  // Pause on tab inactive
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId.current) {
          window.cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
      } else {
        if (!animationFrameId.current && !prefersReducedMotion.current) {
          if (animateRef.current) {
            animateRef.current();
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Update mouse positions
  useEffect(() => {
    onMouseMove();
  }, [onMouseMove]);

  // Re-init when refresh triggers
  // biome-ignore lint/correctness/useExhaustiveDependencies: Intentional bypass
  useEffect(() => {
    initCanvas();
  }, [refresh, initCanvas]);
}
