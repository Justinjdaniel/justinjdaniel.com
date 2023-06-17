import { Flex, Icon, IconButton, Link } from "@chakra-ui/react";

// import Link from "next/link";

const BackButton = () => {
	return (
		<Flex
			w="full"
			h="auto"
			p="4"
			pb="2"
			bgGradient="linear(to-b, #020202,  transparent)"
			position="fixed"
			zIndex="4"
		>
			<IconButton
				as={Link}
				href="/"
				variant="outline"
				rounded="full"
				aria-label="back button"
				icon={
					<Icon viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
						/>
					</Icon>
				}
			/>
		</Flex>
	);
};

export default BackButton;
