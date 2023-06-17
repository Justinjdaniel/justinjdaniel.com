import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";

import LetterFadeIn from "@/components/animations/letter-fade-in";
import NextImage from "@/components/next-image";
import ProfilePicture from "@/components/profile-picture";
import { motion } from "framer-motion";
import award from "../../public/images/award.webp";
import Certifications from "./certifications";
import AboutSkills from "./skills";

const About = () => {
	const textPara = {
		visible: {
			opacity: 1,
			transition: {
				when: "beforeChildren",
				staggerChildren: 1,
			},
		},
		hidden: {
			opacity: 0,
			transition: {
				when: "afterChildren",
				staggerChildren: 1,
				delay: 1,
			},
		},
	};
	return (
		<>
			<Head>
				<title>About | Justin J Daniel</title>
				<meta
					name="description"
					content="I&apos;m Justin J Daniel, a Blockchain Software Developer and Technical Lead with several years of experience in the industry. I specialize in developing smart contracts, decentralized applications, and NFTs using Solidity, Web3.js, and Ethereum."
				/>
				<link rel="canonical" href="https://justinjdaniel.com/about" />
				<meta
					property="og:title"
					content="About | Justin J Daniel"
					key="title"
				/>
			</Head>
			<Flex
				flexDir="column"
				w="full"
				h="full"
				htmlFor="about-page"
				position="relative"
			>
				<Flex
					w="full"
					minH={{ md: "400" }}
					bg="#020202"
					position="relative"
					alignItems={"center"}
					justifyContent={"center"}
					flexDirection={"column"}
				>
					<ProfilePicture />
					<Container p="6" maxW="2xl" zIndex={1}>
						<Heading mb="4">About</Heading>
						<Text mb="2" as={LetterFadeIn} animationDelay="0.01">
							Hey, I&apos;m Justin J Daniel, a Blockchain Software Developer.
						</Text>
						<Text
							pr={{ md: "16", lg: "8" }}
							as={LetterFadeIn}
							animationDelay="0.002"
						>
							As a Blockchain Software Developer and Technical Lead with several
							years of experience in the industry. I specialize in developing
							smart contracts, decentralized applications, and NFTs using
							Solidity, Web3.js, and Ethereum. I also have a strong background
							in web development and implementation of a blockchain-based system
							for services and products.
						</Text>
					</Container>
				</Flex>

				<Flex w="full" h="10" bgGradient="linear(to-b, #020202, transparent)" />
				<Container p="6" maxW="2xl" centerContent>
					<motion.div
						variants={textPara}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						transition={{ ease: "easeInOut", duration: 5, delay: 3 }}
					>
						<Text mb="6" as={LetterFadeIn} animationDelay="0.001">
							As a Technical Lead, I oversee the work of our developers and
							ensure the quality and security of our blockchain solutions. I
							have extensive experience in developing and advising on public and
							private blockchain platforms, such as Ethereum and Polygon. I have
							successfully led the development of a private blockchain service
							for supply chain management, as well as a NFT platform with a
							simple and multi-platform compatible DApp for organizations and
							institutes. I am also currently working on a blockchain
							certification platform for colleges, universities, and companies
							that issue certificates. It is fully customizable and secure.
						</Text>
						<Text as={LetterFadeIn} animationDelay="0.002">
							I am passionate about learning new skills and exploring new
							challenges in the blockchain space. I am always looking for
							opportunities to collaborate with other developers and innovators
							who share my vision of building a more decentralized and trustless
							world. If you are interested in working with me or learning more
							about my projects, please feel free to contact me or visit my
							portfolio website
						</Text>
					</motion.div>
				</Container>
				<AboutSkills my="8" />
				<Container p="6" maxW="2xl">
					<Certifications />
					<Heading mb="4">Awards</Heading>

					<Heading mb="2" as="h6" size="md">
						Blockchain Panelist Award
					</Heading>
					<Text mb="2" color="gray.500" fontSize="sm">
						South India Blockchain Summit, Dec 2022
					</Text>
					<NextImage
						src={award}
						width="auto"
						height="auto"
						maxH="12rem"
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
					<motion.div
						variants={textPara}
						initial="hidden"
						whileInView="visible"
						// viewport={{ once: true }}
						transition={{ ease: "easeInOut" }}
					>
						<Text mb="2" as={LetterFadeIn} animationDelay="0.01">
							Received an award for being part of a panel discussion on
							Blockchain Adoptions and Entrepreneurial Journey with experts and
							enthusiasts from across the country and beyond.
						</Text>
						<Text mb="6" as={LetterFadeIn} animationDelay="0.01">
							Shared insights and best practices on how to leverage blockchain
							technology for innovation and social impact in various domains and
							sectors. Demonstrated knowledge, communication skills, engagement
							with the audience, and relevance to the theme of the summit.
						</Text>
					</motion.div>
					{/* <Heading mb="4">Contact Me</Heading> */}
				</Container>

				<Flex w="full" my="4" />
			</Flex>
		</>
	);
};

export default About;
