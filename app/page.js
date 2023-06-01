"use client";
import { Box, Text, Flex } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/next-js";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
	const backgroundGlow = {
		content: '""',
		left: "50%",
		position: "absolute",
		filter: "blur(45px)",
		transform: "translateZ(0)",
	};

	return (
		<main className={styles.main}>
			<Box className={styles.description}>
				<Text>Justin J Daniel</Text>
				<Flex gap="2">
					<Link
						href="https://www.linkedin.com/in/justin-j-daniel/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Text>
							<Image
								src="linked-in.svg"
								width={20}
								height={20}
								alt="linkedin"
							/>
						</Text>
					</Link>
					<Link
						href="https://github.com/Justinjdaniel"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Text>
							<Image src="github.svg" width={20} height={20} alt="github" />
						</Text>
					</Link>
				</Flex>
			</Box>

			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				position="relative"
				p="4rem 0"
				_before={{
					bg: "linear-gradient(to bottom right, rgba(1, 65, 255, 0), rgba(1, 65, 255, 0), rgba(1, 65, 255, 0.3))",
					borderRadius: "50%",
					w: "480px",
					h: "360px",
					ml: "-400px",
					...backgroundGlow,
				}}
				_after={{
					bg: "radial-gradient(rgba(1, 65, 255, 0.4), rgba(1, 65, 255, 0))",
					w: "240px",
					h: "180px",
					zIndex: "-1",
					...backgroundGlow,
				}}
			>
				<Text as="h1" fontSize="5xl" fontWeight="bold">
					Design, Code and Build
					<br /> for Everyone
				</Text>
			</Box>

			<Box className={styles.grid}>
				<Link
					href="#"
					className={styles.card}
					target="_blank"
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

				<Link
					href="mailto:justinjdaniel@duck.com"
					className={styles.card}
					target="_blank"
					rel="noopener noreferrer"
				>
					<Text as="h2">
						Contact <span>-&gt;</span>
					</Text>
					<p>
						If you have any questions, comments, or feedback, please feel free
						to contact me. Thank you for your interest in my work.
					</p>
				</Link>
			</Box>
		</main>
	);
}
