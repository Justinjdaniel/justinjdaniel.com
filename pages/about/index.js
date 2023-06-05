import {
	Container,
	Flex,
	Heading,
	Text,
	Image as ChakraImage,
} from "@chakra-ui/react";

import Image from "next/image";
import bgPic from "../../public/images/about-bg.webp";

const About = () => {
	return (
		<Flex flexDir="column" w="full" h="full">
			<Flex
				w="full"
				h="510"
				bg="#020202"
				position="relative"
				alignItems={"center"}
			>
				<Container p={4} maxW="2xl" zIndex={1}>
					<Heading mb="4">About</Heading>
					<Text mb="2">
						Hey, I&apos;m Justin J Daniel, a Blockchain Software Developer.
					</Text>
					<Text pr={{ md: "8" }}>
						As a Blockchain Software Developer and a technical lead, I oversee
						the work of our developers and ensure the quality and security of
						our blockchain solutions. I have extensive experience in developing
						smart contracts, decentralized applications, and NFTs using
						Solidity, Web3.js, and Ethereum. I have also successfully led the
						implementation of a blockchain-based supply chain management system
						for a major client, which improved the transparency and efficiency
						of their operations.
					</Text>
				</Container>
				<ChakraImage
					as={Image}
					right="0"
					bottom="0"
					style={{ aspectRatio: "1" }}
					position="absolute"
					src={bgPic}
					alt="Image of the author with dark background"
					width={500}
					height={500}
					quality={100}
				/>
			</Flex>

			{/* <Container
				maxW="container.xl"
				p={4}
				// mt={4}
				// maxW="2xl"
				bg="blue.600"
				centerContent
			>
				About
			</Container> */}
		</Flex>
	);
};

export default About;
