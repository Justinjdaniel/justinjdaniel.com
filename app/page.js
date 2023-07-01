"use client";

import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Link as ChakraLink } from "@chakra-ui/next-js";
import { keyframes } from "@chakra-ui/react";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import BackGroundGlowBox from "@/components/background-glow-box";
import NetlifyContactMeForm from "@/components/forms/netlify-contact-me";
import ModalComponent from "@/components/modal";
import Particles from "@/components/particles";

import styles from "./page.module.css";

export default function Home() {
	const animation = keyframes`
    to { background-position: 200% center; }
  `;

	const socialLinkStyle = {
		p: "1rem",
		borderRadius: "1rem",
		border: "1px solid rgba(108, 108, 108, 0.3)",
		backgroundColor: "rgba(20, 20, 20, 0.5)",
		target: "_blank",
	};

	const { isOpen, onOpen, onClose } = useDisclosure();

	const headingAnimations = {
		hidden: {
			opacity: 0,
			y: "50%",
			scale: 1.5,
			clipPath: "polygon(0 0, 100% 0, 100% 00%, 0 00%)",
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
		},
	};

	return (
		<main className={styles.main}>
			<Particles quantity={200} position="absolute" w="full" h="80dvh" />
			<Box className={styles.description} zIndex={10}>
				<Text fontWeight="extrabold">Justin J Daniel</Text>
				<Flex gap="4" justifyContent="center" alignItems="center">
					<ChakraLink
						href="https://www.linkedin.com/in/justin-j-daniel/"
						rel="noopener noreferrer"
						{...socialLinkStyle}
					>
						<Image src="linked-in.svg" width={20} height={20} alt="linkedin" />
					</ChakraLink>
					<ChakraLink
						href="https://github.com/Justinjdaniel"
						rel="noopener noreferrer"
						{...socialLinkStyle}
					>
						<Image src="github.svg" width={20} height={20} alt="github" />
					</ChakraLink>
				</Flex>
			</Box>

			<BackGroundGlowBox flexDir="column">
				<motion.div
					variants={headingAnimations}
					transition={{ duration: 1, ease: "easeInOut" }}
					initial="hidden"
					whileInView="visible"
				>
					<Text
						as="h1"
						cursor="default"
						fontWeight="extrabold"
						bgClip="text"
						textAlign={{ base: "center", md: "left" }}
						backgroundSize="200% auto"
						animation={`${animation} 5s linear infinite`}
						fontSize={{ base: "3xl", md: "5xl", lg: "6xl", "2xl": "8xl" }}
						bgGradient="linear(to-r, pink.500, purple.500, cyan.500, green.500, teal.500, yellow.500, orange.500, red.500, pink.500)"
					>
						<Text as="span">Design, Code & Build </Text>
						<Text as="span" whiteSpace="nowrap" display={{ md: "block" }}>
							for Everyone
						</Text>
					</Text>
				</motion.div>
				<motion.div
					variants={headingAnimations}
					transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
					initial="hidden"
					whileInView="visible"
				>
					<Text
						as="h2"
						textAlign="center"
						fontWeight="thin"
						fontSize={{ base: "xs", md: "sm", "2xl": "md" }}
						color="whiteAlpha.800"
						whiteSpace="nowrap"
					>
						Hey, I&apos;m Justin, a Blockchain Software Developer, <br />
						Learn more{" "}
						<Button
							as={Link}
							href="/about"
							size="xs"
							cursor="pointer"
							variant="outline"
							fontWeight="medium"
							color="whiteAlpha.800"
							fontSize={{ base: "xs", md: "sm", "2xl": "md" }}
							bgGradient="linear(to-r, pink.500, purple.500, cyan.500)"
							bgClip="text"
							_hover={{
								bgGradient: "linear(to-r, purple.500, cyan.500)",
								bgClip: "text",
								borderColor: "gray.600",
							}}
						>
							about me
						</Button>
					</Text>
				</motion.div>
			</BackGroundGlowBox>

			<Box className={styles.grid}>
				<Link href="#" className={styles.card} rel="noopener noreferrer">
					<Text as="h2">
						Projects <span>-&gt;</span>
					</Text>
					<Text>
						Find More About My Work and How I Can Help You Achieve Your Web
						Goals.
					</Text>
				</Link>

				<Box as="a" className={styles.card} onClick={onOpen} cursor="pointer">
					<Text as="h2">
						Contact <span>-&gt;</span>
					</Text>
					<p>
						If you have any questions, comments, or feedback, please feel free
						to contact me. Thank you for your interest in my work.
					</p>
				</Box>
			</Box>
			<ModalComponent
				isOpen={isOpen}
				onClose={onClose}
				modalContentProps={{
					mx: "2",
					backdropFilter: "blur(16px) saturate(180%)",
					backgroundColor: "blackAlpha.600",
					borderRadius: "12px",
					border: "1px solid rgba(209, 213, 219, 0.3)",
				}}
				modalHeader="Contact Me"
			>
				<NetlifyContactMeForm onClose={onClose} />
			</ModalComponent>
		</main>
	);
}
