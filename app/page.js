"use client";
import { Box, Text, Flex } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/next-js";
import styles from "./page.module.css";
import Image from "next/image";
import BackGroundGlowBox from "@/components/background-glow-box";
import Particles from "@/components/particles";
import { keyframes, Button } from "@chakra-ui/react";
import ModalComponent from "@/components/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import NetlifyContactMeForm from "@/components/forms/netlify-contact-me";

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

	return (
		<main className={styles.main}>
			<Particles quantity={200} position="absolute" w="full" h="80dvh" />
			<Box className={styles.description} zIndex={10}>
				<Text>Justin J Daniel</Text>
				<Flex gap="4" justifyContent="center" alignItems="center">
					<Link
						href="https://www.linkedin.com/in/justin-j-daniel/"
						rel="noopener noreferrer"
						{...socialLinkStyle}
					>
						<Image src="linked-in.svg" width={20} height={20} alt="linkedin" />
					</Link>
					<Link
						href="https://github.com/Justinjdaniel"
						rel="noopener noreferrer"
						{...socialLinkStyle}
					>
						<Image src="github.svg" width={20} height={20} alt="github" />
					</Link>
				</Flex>
			</Box>

			<BackGroundGlowBox flexDir="column">
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
				<Text
					as="h2"
					fontWeight="thin"
					fontSize={{ base: "xs", md: "sm", "2xl": "md" }}
					textAlign="center"
					color="whiteAlpha.800"
				>
					Hey, I&apos;m Justin, a Blockchain Software Developer:{" "}
					<br />
					Learn more{" "}
					<Button
						as="a"
						href="#"
						size="xs"
						variant="outline"
						cursor="pointer"
						fontWeight="thin"
						color="whiteAlpha.800"
						rel="noopener noreferrer"
						fontSize={{ base: "xs", md: "sm", "2xl": "md" }}
					>
						about me
					</Button>
				</Text>
			</BackGroundGlowBox>

			<Box className={styles.grid}>
				<Link
					href="#"
					className={styles.card}
					rel="noopener noreferrer"
				>
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
