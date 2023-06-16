import NextImage from "@/components/next-image";
import { Container, Flex, Heading, Text } from "@chakra-ui/react";

import bgPic from "../../public/images/about-bg.webp";
import award from "../../public/images/award.webp";
import Certifications from "./certifications";
import AboutSkills from "./skills";

const About = () => {
	return (
		<Flex flexDir="column" w="full" h="full" htmlFor="about">
			<Flex
				w="full"
				minH={{ md: "400" }}
				bg="#020202"
				position="relative"
				alignItems={"center"}
			>
				<Container p="6" maxW="2xl" zIndex={1}>
					<Heading mb="4">About</Heading>
					<Text mb="2">
						Hey, I&apos;m Justin J Daniel, a Blockchain Software Developer.
					</Text>
					<Text pr={{ base: "24", md: "16", lg: "8" }}>
						As a Blockchain Software Developer and Technical Lead with several
						years of experience in the industry. I specialize in developing
						smart contracts, decentralized applications, and NFTs using
						Solidity, Web3.js, and Ethereum. I also have a strong background in
						web development and implementation of a blockchain-based system for
						services and products.
					</Text>
				</Container>
				<NextImage
					right="0"
					bottom="0"
					style={{ aspectRatio: "1" }}
					objectFit="cover"
					objectPosition="right"
					position="absolute"
					src={bgPic}
					alt="Image of the author with dark background"
					width={400}
					height={400}
					quality={100}
				/>
			</Flex>

			<Flex w="full" h="10" bgGradient="linear(to-b, #020202, transparent)" />
			<Container p="6" maxW="2xl" centerContent>
				<Text mb="6">
					As a Technical Lead, I oversee the work of our developers and ensure
					the quality and security of our blockchain solutions. I have extensive
					experience in developing and advising on public and private blockchain
					platforms, such as Ethereum and Polygon. I have successfully led the
					development of a private blockchain service for supply chain
					management, as well as a NFT platform with a simple and multi-platform
					compatible DApp for organizations and institutes. I am also currently
					working on a blockchain certification platform for colleges,
					universities, and companies that issue certificates. It is fully
					customizable and secure.
				</Text>
				<Text>
					I am passionate about learning new skills and exploring new challenges
					in the blockchain space. I am always looking for opportunities to
					collaborate with other developers and innovators who share my vision
					of building a more decentralized and trustless world. If you are
					interested in working with me or learning more about my projects,
					please feel free to contact me or visit my portfolio website
				</Text>
			</Container>
			<AboutSkills my="8" />
			<Container p="6" maxW="2xl">
				<Certifications />
				<Heading mb="4">Awards</Heading>

				<Heading mb="2" as="h6" size="md">
					Blockchain Panelist Award
				</Heading>
				<Text mb="2" color="gray.500">
					South India Blockchain Summit, Dec 2022
				</Text>
				<NextImage
					src={award}
					width="auto"
					height={200}
					mx="auto"
					rounded="md"
					alt="Awarded by Kerala Digital University's Vice Chancellor"
				/>
				<Text
					mb="4"
					mt="1"
					fontSize="xx-small"
					textAlign="center"
					color="gray.500"
					fontFamily="mono"
				>
					Being honored with an award by the Vice Chancellor of Kerala Digital
					University
				</Text>
				<Text mb="6">
					Received an award for being part of a panel discussion on Blockchain
					Adoptions and Entrepreneurial Journey with experts and enthusiasts
					from across the country and beyond.
					<br /> Shared insights and best practices on how to leverage
					blockchain technology for innovation and social impact in various
					domains and sectors. Demonstrated knowledge, communication skills,
					engagement with the audience, and relevance to the theme of the
					summit.
				</Text>
				{/* <Heading mb="4">Contact Me</Heading> */}
			</Container>

			<Flex w="full" my="4" />
		</Flex>
	);
};

export default About;
