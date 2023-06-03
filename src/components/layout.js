import { Flex } from "@chakra-ui/react";
import React from "react";

const PagesLayout = ({ children }) => {
	return (
		<Flex
			minH="100dvh"
			justifyContent="center"
			alignItems="center"
			bg="gray.900"
		>
			{children}
		</Flex>
	);
};

export default PagesLayout;
