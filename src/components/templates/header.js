import MotionBox from "@/components/motion/motion-box";
import { Flex } from "@chakra-ui/react";
import { useScroll, useSpring } from "framer-motion";

const Header = ({ children, ...rest }) => {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	return (
		<Flex
			w="full"
			h="auto"
			p="4"
			pb="2"
			bgGradient="linear(to-b, #020202,  transparent)"
			position="fixed"
			zIndex="4"
			{...rest}
		>
			<MotionBox
				position="fixed"
				top="0"
				left="0"
				right="0"
				height="2"
				bg="red"
				bgGradient="linear(to-r, red, purple)"
				transformOrigin="0%"
				style={{ scaleX }}
			/>
			{children}
		</Flex>
	);
};

export default Header;
