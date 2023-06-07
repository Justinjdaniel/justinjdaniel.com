import { Flex } from "@chakra-ui/react";
import React from "react";

const PagesLayout = ({ children }) => {
	return (
		<Flex minH="100dvh" bg="blackAlpha.700">
			{children}
		</Flex>
	);
};

export default PagesLayout;
