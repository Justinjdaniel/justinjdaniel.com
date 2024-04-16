"use client";

import ReactDOM from "react-dom";

/**
 * Preloads the "sprite.svg" image asynchronously using ReactDOM.preload.
 *
 * @return {null} Returns null.
 */
export function PreloadResources() {
	ReactDOM.preload("sprite.svg", { as: "image" });
	return null;
}
