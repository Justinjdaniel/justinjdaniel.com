import { useEffect, useState } from "react";

/**
 * Returns the current mouse position as an object with x and y coordinates.
 *
 * @return {Object} An object with x and y coordinates representing the mouse position.
 */
export function useMousePosition() {
	const [mousePosition, setMousePosition] = useState({
		x: 0,
		y: 0,
	});

	useEffect(() => {
		const handleMouseMove = (event) => {
			setMousePosition({ x: event.clientX, y: event.clientY });
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return mousePosition;
}
