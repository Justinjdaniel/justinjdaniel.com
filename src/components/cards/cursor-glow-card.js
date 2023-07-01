/* eslint-disable react/display-name */
import { Box, Flex } from "@chakra-ui/react";
import React, { useRef } from "react";

// Use React.memo() to prevent unnecessary re-renders
export const GlowCardContainer = React.memo(({ children, ...rest }) => {
	return (
		<Flex
			flexWrap="wrap"
			gap="8px"
			maxWidth="916px"
			width="calc(100% - 20px)"
			role="group"
			{...rest}
		>
			{children}
		</Flex>
	);
});

const GlowCard = React.memo(({ children, cardProps, ...rest }) => {
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
		<Flex
			_groupHover={{
				_after: {
					opacity: 1,
				},
			}}
			ref={boxRef}
			borderWidth="1px"
			borderRadius="lg"
			overflow="hidden"
			bg="whiteAlpha.50"
			cursor="pointer"
			height="auto"
			flexDirection="column"
			position="relative"
			width="auto"
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
			{...cardProps}
		>
			<Flex
				borderRadius="inherit"
				flex-direction="column"
				flex-grow="1"
				inset="1px"
				padding="10px"
				position="absolute"
				z-index="2"
			/>
			<Box zIndex="4" display="flex" {...rest}>
				{children}
			</Box>
		</Flex>
	);
});

export default GlowCard;
