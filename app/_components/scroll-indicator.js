"use client";

import { useEffect, useState } from "react";

/**
 * Function component that displays a scroll indicator bar based on the user's scroll progress.
 *
 * @return {JSX.Element} The scroll indicator bar JSX element.
 */
const ScrollIndicator = () => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const totalScroll =
				document.documentElement.scrollHeight - window.innerHeight;
			const currentScroll = window.scrollY;
			const newProgress = Math.round((currentScroll * 100) / totalScroll);
			setProgress(newProgress);
		};

		const scrollListener = () => {
			requestAnimationFrame(handleScroll);
		};

		window.addEventListener("scroll", scrollListener);
		return () => window.removeEventListener("scroll", scrollListener);
	}, []);

	return (
		<div
			className="fixed top-0 left-0 z-50 h-1 bg-gradient-to-r from-yellow-400 to-red-600 transition-width duration-200 ease-out"
			style={{ width: `${progress}%` }}
		/>
	);
};

export default ScrollIndicator;
