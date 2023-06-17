import { chakra } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";

const MotionBox = chakra(motion.div, {
	shouldForwardProp: isValidMotionProp || shouldForwardProp(prop),
});

export default MotionBox;
