import { Flex } from "@chakra-ui/layout";

export default function Badge({ children, ...rest }) {
	return (
		<Flex
			p="2"
			rounded="md"
			border="1px"
			fontSize="sm"
			lineHeight="4"
			w="max-content"
			alignItems="center"
			bg="whiteAlpha.100"
			color="whiteAlpha.800"
			textDecoration="none"
			borderColor="whiteAlpha.200"
			{...rest}
		>
			{children}
		</Flex>
	);
}
