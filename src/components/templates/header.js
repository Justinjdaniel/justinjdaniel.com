import { Flex } from "@chakra-ui/react";

const Header = ({ children, ...rest }) => {
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
			{children}
		</Flex>
	);
};

export default Header;
