"use client";

// MARK: - Imports
import { useRef } from "react";
import { useParticlesEngine } from "@/lib/utils/use-particles-engine";

// MARK: - Render

/**
 * Renders an animated particle canvas.
 *
 * @param {Object} props - Component properties.
 * @param {string} [props.className=""] - CSS class applied to the container.
 * @param {number} [props.quantity=30] - Number of particles to display.
 * @param {number} [props.staticity=50] - Particle resistance to mouse movement.
 * @param {number} [props.ease=50] - Particle movement smoothing factor.
 * @param {boolean} [props.refresh=false] - Whether to reinitialize the particles.
 * @returns {import("react").JSX.Element} The particle canvas container.
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
