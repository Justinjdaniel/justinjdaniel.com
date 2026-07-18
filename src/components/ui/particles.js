"use client";

// MARK: - Imports
import { useRef } from "react";
import { useParticlesEngine } from "@/lib/utils/use-particles-engine";

// MARK: - Render

/**
 * Particles component that displays a dynamic background particle canvas.
 * Fully optimized for zero-allocation animation, reduced motion,
 * tab inactivity pausing, and modular maintainability.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} [props.className=""] - Optional CSS class for the container wrapper.
 * @param {number} [props.quantity=30] - Amount of particles to generate.
 * @param {number} [props.staticity=50] - Resistance/inertia of particles reacting to the mouse.
 * @param {number} [props.ease=50] - Smooth transition interpolation multiplier.
 * @param {boolean} [props.refresh=false] - Re-initializes particles when toggled.
 * @returns {import("react").JSX.Element} The rendered React component.
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

  // Delegate high-frequency calculations and state loops to custom engine hook
  useParticlesEngine({
    canvasRef,
    canvasContainerRef,
    quantity,
    staticity,
    ease,
    refresh,
  });

  return (
    <div className={className} ref={canvasContainerRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
