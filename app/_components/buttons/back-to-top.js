"use client";

import React from "react";

/**
 * Function component for a back to top button that appears when scrolling down the page.
 *
 * @return {JSX.Element} Button element to scroll back to the top of the page.
 */
const BackToTopButton = () => {
	const [isVisible, setIsVisible] = React.useState(false);

	const handleScroll = () => {
		setIsVisible(window.scrollY > 300);
	};

	React.useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<button
			type="button"
			className={`fixed bottom-8 right-8 z-10 bg-neutral-900 text-neutral-100 p-2 rounded-full shadow-lg ${
				isVisible ? "inline" : "hidden"
			}`}
			onClick={scrollToTop}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={2}
			>
				<title>Back to top</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M5 10l7-7m0 0l7 7m-7-7v18"
				/>
			</svg>
		</button>
	);
};

export default BackToTopButton;
