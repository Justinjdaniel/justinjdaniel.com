import React from "react";

const IntroAnimation = () => {
	return (
		<div>
			{/* <h1 className="z-10 text-center text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-fade-right font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
				loading
			</h1> */}
			<div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
		</div>
	);
};

export default IntroAnimation;
