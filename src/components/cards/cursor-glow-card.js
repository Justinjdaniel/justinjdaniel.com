/* eslint-disable react/display-name */
import { Box } from "@chakra-ui/react";
import React, { useRef } from "react";

// Use React.memo() to prevent unnecessary re-renders
export const GlowCardContainer = React.memo(({ children, ...rest }) => {
	return (
		<Box
			display="flex"
			flexWrap="wrap"
			gap="8px"
			maxWidth="916px"
			width="calc(100% - 20px)"
			role="group"
			{...rest}
		>
			{children}
		</Box>
	);
});

const GlowCard = React.memo(({ children, ...rest }) => {
	const boxRef = useRef(null);

	// Use useCallback() to memoize the function
	const handleMouseMove = React.useCallback((e) => {
		const rect = boxRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		// assign the current mouse position to the ref attribute
		boxRef.current.style.setProperty("--mouse-x", `${x}px`);
		boxRef.current.style.setProperty("--mouse-y", `${y}px`);
	}, []);

	return (
		<Box
			_groupHover={{
				_after: {
					opacity: 1,
				},
			}}
			ref={boxRef}
			borderWidth="1px"
			borderRadius="lg"
			overflow="hidden"
			bg="rgba(255, 255, 255, 0.1)"
			cursor="pointer"
			display="flex"
			height="260px"
			flexDirection="column"
			position="relative"
			width="300px"
			_hover={{
				_before: {
					opacity: 1,
				},
			}}
			sx={{
				"&::before, &::after": {
					borderRadius: "inherit",
					content: '""',
					height: "100%",
					left: "0px",
					opacity: 0,
					position: "absolute",
					top: "0px",
					transition: "opacity 500ms",
					width: "100%",
				},

				"&::before": {
					background:
						"radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06),transparent 40%)",
					zIndex: 3,
				},

				"&::after": {
					background:
						"radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.04), transparent 40%)",
					zIndex: 1,
				},
			}}
			onMouseMove={handleMouseMove}
			{...rest}
		>
			<Box
				backgroundColor="rgb(23, 23, 23)"
				borderRadius="inherit"
				display="flex"
				flex-direction="column"
				flex-grow="1"
				inset="1px"
				padding="10px"
				position="absolute"
				z-index="2"
			/>
			<Box zIndex="1">{children}</Box>
		</Box>
	);
});

export default GlowCard;
