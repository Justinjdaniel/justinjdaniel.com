import { Box, useStyleConfig } from "@chakra-ui/react";
import { motion } from "framer-motion";

export const Card = ({ children }) => {
	const styles = useStyleConfig("Card");

	const mouseX = motion.useSpring(0, { stiffness: 500, damping: 100 });
	const mouseY = motion.useSpring(0, { stiffness: 500, damping: 100 });

	function onMouseMove({ currentTarget, clientX, clientY }) {
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}
	const maskImage = motion.useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
	const style = { maskImage, WebkitMaskImage: maskImage };

	return (
		<Box
			as={motion.div}
			onMouseMove={onMouseMove}
			sx={styles}
			className="group"
			overflow="hidden"
		>
			<Box pointerEvents="none">
				<Box
					as={motion.div}
					position="absolute"
					inset="0"
					zIndex="0"
					bgGradient={`linear(to-br, ${theme.colors.zinc[100]}10, transparent)`}
					opacity={{ base: "100%", groupHover: "50%" }}
					className="  via-zinc-100/10 transition duration-1000"
					style={style}
				/>
				<Box
					as={motion.div}
					position="absolute"
					opacity={{ base: "0%", groupHover: "100%" }}
					mixBlendMode="overlay"
					className="  transition duration-1000 "
					style={style}
				/>
			</Box>
			{children}
		</Box>
	);
};
