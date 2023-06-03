import { Box, chakra } from "@chakra-ui/react";
import {
	motion,
	useMotionTemplate,
	useMotionValue,
	useSpring,
} from "framer-motion";

export const Card = ({ children }) => {
	const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
	const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

	function onMouseMove({ currentTarget, clientX, clientY }) {
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}
	const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
	const style = { maskImage, WebkitMaskImage: maskImage };

	return (
		<Box
			onMouseMove={onMouseMove}
			overflow="hidden"
			position="relative"
			transition="duration-700"
			borderRadius="xl"
			_hover={{ bg: "gray.800", bgOpacity: "0.1" }}
			className="group md:gap-8"
			borderColor={{ base: "gray.600", hover: "gray.400" }}
			borderOpacity={{ base: "1", hover: "0.5" }}
		>
			<Box pointerEvents="none">
				<Box
					position="absolute"
					inset={0}
					zIndex={0}
					transition="duration-1000"
					maskImage="linear-gradient(black,transparent)"
				/>
				<chakra.motion.div
					position="absolute"
					inset={0}
					zIndex={10}
					bgGradient="linear(to-br, red.500, yellow.500)"
					opacity={1}
					transition="duration-1000"
					_groupHover={{ opacity: "0.5" }}
					style={style}
				/>
				<chakra.motion.div
					position="absolute"
					inset={0}
					zIndex={10}
					opacity={0}
					mixBlendMode="overlay"
					transition="duration-1000"
					_groupHover={{ opacity: "1" }}
					style={style}
				/>
			</Box>

			{children}
		</Box>
	);
};
