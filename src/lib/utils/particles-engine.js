// MARK: - Helper Functions

/**
 * Maps a value from one range to another and floors non-positive results at zero.
 *
 * @param {number} value - The input value to map.
 * @param {number} start1 - The lower bound of the input range.
 * @param {number} end1 - The upper bound of the input range.
 * @param {number} start2 - The lower bound of the output range.
 * @param {number} end2 - The upper bound of the output range.
 * @returns {number} The mapped value, or `0` when the mapped value is zero or negative.
 */
export function remapValue(value, start1, end1, start2, end2) {
  const remapped =
    ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
  return remapped > 0 ? remapped : 0;
}

/**
 * Creates initial parameters for a single circle particle.
 *
 * @param {number} w - The width of the canvas.
 * @param {number} h - The height of the canvas.
 * @returns {Object} An object representing the initial circle particle properties.
 */
export function createCircleParams(w, h) {
  const x = Math.floor(Math.random() * w);
  const y = Math.floor(Math.random() * h);
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
}

/**
 * Reinitialize a circle particle with randomized position and motion properties.
 * @param {Object} circle - The circle particle object to reinitialize.
 * @param {number} w - The width of the canvas.
 * @param {number} h - The height of the canvas.
 */
export function resetCircleInPlace(circle, w, h) {
  circle.x = Math.floor(Math.random() * w);
  circle.y = Math.floor(Math.random() * h);
  circle.translateX = 0;
  circle.translateY = 0;
  circle.size = Math.floor(Math.random() * 2) + 0.1;
  circle.alpha = 0;
  circle.targetAlpha = Math.random() * 0.6 + 0.1;
  circle.dx = (Math.random() - 0.5) * 0.2;
  circle.dy = (Math.random() - 0.5) * 0.2;
  circle.magnetism = 0.1 + Math.random() * 4;
}
