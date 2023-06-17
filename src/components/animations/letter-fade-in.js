import { Box } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";

const LetterFadeIn = ({
	children,
	animationProps,
	animationDelay = 0.1,
	...rest
}) => {
	return (
		<Box as={motion.p} {...rest}>
			<AnimatePresence>
				{children.split("").map((letter, i) => (
					<motion.span
						key={i * Math.random()}
						initial={{ opacity: 0 }}
						whileInView={{
							opacity: 1,
						}}
						viewport={{ once: true }}
						transition={{ delay: i * animationDelay }}
						{...animationProps}
					>
						{letter}
					</motion.span>
				))}
			</AnimatePresence>
		</Box>
	);
};

export default LetterFadeIn;

LetterFadeIn.propTypes = {
	// Specify that children should be a string
	children: PropTypes.string,
};

LetterFadeIn.defaultProps = {
	// Provide a default value for children
	children: "Hello, I'm a fading text!",
};
