/**
 * Function component that displays a scroll indicator bar based on the user's scroll progress.
 *
 * @return {JSX.Element} The scroll indicator bar JSX element.
 */
const ScrollIndicator = (props) => {
	return (
		<div
			className="scroll-indicator sticky w-full h-1 rounded-full top-0 left-0 z-50 origin-left bg-gradient-to-r from-yellow-400 to-red-600 transition-width animate-grow-progress [animation-timeline:scroll()]"
			{...props}
		/>
	);
};

export default ScrollIndicator;
