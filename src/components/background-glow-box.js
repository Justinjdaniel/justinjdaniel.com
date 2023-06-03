import React from "react";
import { Box } from "@chakra-ui/layout";

const BackGroundGlowBox = ({ children, ...rest }) => {
	const backgroundGlow = {
		content: '""',
		left: "50%",
		position: "absolute",
		filter: "blur(45px)",
		transform: "translateZ(0)",
	};

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			position="relative"
			p="4rem 0"
			transition="all 2s ease-in-out"
			_before={{
				bgGradient:
					"linear(to-br, rgba(0, 255, 0, 0), rgba(0, 255, 0, 0), rgba(0, 255, 255, 0.4))",
				// "linear(to-br, rgba(1, 65, 255, 0), rgba(1, 65, 255, 0), rgba(1, 65, 255, 0.4))",
				borderRadius: "50%",
				w: "480px",
				h: "380px",
				ml: "-400px",
				...backgroundGlow,
			}}
			_after={{
				bgGradient: "radial(rgba(1, 65, 255, 0.4), rgba(1, 65, 255, 0))",
				w: "240px",
				h: "180px",
				zIndex: "-1",
				...backgroundGlow,
			}}
			// _hover={{
			// 	transition: "all 5s ease-in-out",
			// 	_before: {
			// 		bgGradient:
			// 			"linear(to-br, rgba(0, 255, 0, 0), rgba(0, 255, 0, 0), rgba(0, 255, 255, 0.4))",
			// 	},
			// 	_after: {
			// 		bgGradient: "radial(rgba(100, 165, 255, 0.6), rgba(0, 255, 0, 0))",
			// 	},
			// }}
			{...rest}
		>
			{children}
		</Box>
	);
};

export default BackGroundGlowBox;
