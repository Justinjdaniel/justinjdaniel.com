"use client";

import { useEffect } from "react";

/**
 * Renders the IntroAnimation component.
 *
 * @return {JSX.Element} The IntroAnimation component.
 */
const IntroAnimation = ({ ...props }) => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div
			className="flex flex-col min-h-screen items-center justify-center animate-disappear"
			{...props}
		>
			<div className="intro-helix-container animate-fade-out">
				<div className="slice" />
				<div className="slice" />
				<div className="slice" />
				<div className="slice" />
				<div className="slice" />
				<div className="slice" />
			</div>
		</div>
		// ) : (
		// 	<div>
		// 		<div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
		// 	</div>
	);
};

export default IntroAnimation;

/**
 * Renders a text animation component.
 *
 * @return {JSX.Element} The text animation component.
 */
const TextAnimation = () => {
	<h1 className="z-10 text-center text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-fade-right font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
		Custom Text Here
	</h1>;
};

/**
 * Renders an orbit animation component.
 *
 * @return {JSX.Element} The orbit animation component.
 */
const OrbitAnimation = () => (
	<div className="orbit-animation-container">
		{[...Array(6)].map((i) => (
			<div key={i} className="slice animate-orbit" />
		))}
	</div>
);
