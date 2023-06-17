import { Flex } from "@chakra-ui/react";

import NextImage from "@/components/next-image";
import bgPic from "../../public/images/about-bg.webp";
import profilePic from "../../public/images/about-profile-pic.webp";

const ProfilePicture = () => {
	return (
		<>
			<NextImage
				right="0"
				bottom="0"
				display={{ base: "none", md: "block" }}
				style={{ aspectRatio: "1" }}
				objectFit="cover"
				objectPosition="right"
				position="absolute"
				src={bgPic}
				alt="Image of the author with dark background"
				width={400}
				height={400}
				quality={90}
				placeholder="blur"
			/>
			<Flex
				display={{ base: "flex", md: "none" }}
				position="relative"
				w="full"
				h="full"
				justifyContent={"center"}
				alignItems="center"
			>
				<Flex
					w="2"
					h="full"
					bg="red"
					position="absolute"
					left="0"
					bottom="16"
					rounded="full"
					boxShadow="0 0 10px 5px red"
				/>
				<NextImage
					right="0"
					bottom="0"
					rounded="full"
					style={{ aspectRatio: "1" }}
					objectFit="cover"
					objectPosition="center"
					src={profilePic}
					alt="Image of the author without background"
					width={250}
					height={250}
					quality={90}
					placeholder="blur" // {empty} | {blur}
				/>
				<Flex
					h="16"
					w="full"
					bottom="0"
					pos="absolute"
					bgGradient="linear(to-t, #020202, transparent)"
				/>
			</Flex>
		</>
	);
};

export default ProfilePicture;
