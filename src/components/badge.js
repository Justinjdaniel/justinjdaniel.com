import { Link } from "@chakra-ui/react";

export default function Badge(props) {
	return (
		<Link
			{...props}
			target="_blank"
			border="1px"
			borderColor="gray.200"
			darkBorderColor="gray.700"
			bg="gray.50"
			darkBg="gray.800"
			rounded="md"
			p="1"
			fontSize="sm"
			display="inline-flex"
			alignItems="center"
			lineHeight="4"
			color="gray.900"
			darkColor="gray.100"
			textDecoration="none"
		/>
	);
}
