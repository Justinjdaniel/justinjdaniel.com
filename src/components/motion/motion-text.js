import { chakra } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";

const MotionText = chakra(motion.p, {
	shouldForwardProp: isValidMotionProp || shouldForwardProp(prop),
});

export default MotionText;
