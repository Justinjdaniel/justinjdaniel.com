"use client";

import Badge from "@/components/badge";
import GlowCard from "@/components/cards/cursor-glow-card";
import {
	Container,
	Divider,
	Flex,
	Grid,
	GridItem,
	Heading,
	Text,
	Wrap,
	WrapItem,
} from "@chakra-ui/layout";
import { Link } from "@chakra-ui/next-js";

import Head from "next/head";
import Image from "next/image";

import projects from "@/database/projects";
import LetterFadeIn from "@/components/animations/letter-fade-in";

import arrow from "public/icons/arrow-up-right.svg";
import github from "public/icons/github.svg";

const Page = () => {
	return (
		<>
			<Head>
				<title>Projects | Justin J Daniel</title>
				<meta name="description" content="Showcase my skills and projects." />
				<link rel="canonical" href="https://justinjdaniel.com/about" />
				<meta
					property="og:title"
					content="About | Justin J Daniel"
					key="title"
				/>
			</Head>
			<Flex
				w="full"
				h="full"
				p="6"
				flexDir="column"
				// bg="whiteAlpha.50"
				position="relative"
				alignItems="center"
				justifyContent="center"
				htmlFor="projects-page"
			>
				<Container mb="6" maxWidth="container.lg" color="whiteAlpha.600">
					<Heading
						as="h1"
						size="2xl"
						py="5"
						pt={{ md: "16" }}
						color="whiteAlpha.900"
					>
						Projects
					</Heading>
					<Text as={LetterFadeIn} animationDelay="0.008">
						These projects are my personal hobbies and I work on them in my
						spare time. Please note that most of them are not actively
						maintained.
					</Text>
					<Divider my={{ base: 4, md: 6, lg: 12 }} />
					{/* <Heading
						as="h2"
						size="lg"
						my="5"
						display="inline-flex"
						alignItems="center"
						gap="2"
						color="whiteAlpha.900"
					>
						<Image src={stars} alt="stars" width={25} height={25} /> Featured
					</Heading> */}
					<Grid
						mb="4"
						gap="6"
						w="full"
						templateColumns={{ lg: "repeat(2, 1fr)" }}
					>
						{projects.map((project) => (
							<GridItem
								as={GlowCard}
								key={project.id}
								gap="4"
								flexDir="column"
								cardProps={{
									width: "full",
									minHeight: "15rem",
									padding: { base: "6", md: "8", lg: "10" },
									bg: "transparent",
									borderColor: "whiteAlpha.500",
								}}
							>
								{project.image && (
									<Image
										src={project.image}
										alt={project.name}
										width={auto}
										height={auto}
									/>
								)}
								<Text fontSize="xs" color="whiteAlpha.600">
									{new Date(project.date).toUTCString().slice(5, 16)}
								</Text>
								<Heading
									size="xl"
									color="whiteAlpha.900"
									fontFamily="heading"
									fontWeight="bold"
								>
									{project.name}
								</Heading>
								<Text as={LetterFadeIn} animationDelay="0.008">
									{project.description}
								</Text>
								<Wrap gap="2">
									{project.tags.map((tag, i) => (
										<WrapItem as={Badge} gap="2" key={i * 1}>
											{tag}
										</WrapItem>
									))}
								</Wrap>
								<Flex gap="2">
									<Badge
										gap="2"
										as={Link}
										href={project.github}
										target="_blank"
										rel="noopener noreferrer"
										onClick={(e) => alert("This feature is not yet available")}
									>
										<Image src={github} alt="github" width={15} height={15} />
										GitHub Repo
										<Image src={arrow} alt="arrow" width={15} height={15} />
									</Badge>
								</Flex>
							</GridItem>
						))}
					</Grid>
					<GlowCard
						cardProps={{
							padding: "6",
							width: "full",
							minHeight: "10rem",
							flexDir: "column",
							justifyContent: "center",
							alignItems: "center",
							bg: "transparent",
							borderColor: "whiteAlpha.500",
						}}
						flexDir="column"
						textAlign="center"
					>
						<Heading
							size="xl"
							color="whiteAlpha.900"
							fontFamily="heading"
							fontWeight="bold"
							mb="4"
						>
							What&apos;s Next?
						</Heading>
						<Text as={LetterFadeIn} animationDelay="0.002">
							I love to create and share my personal projects with the world.
							They are a reflection of my passions, skills, and interests. Some
							of the projects that I am currently working on or planning to
							launch soon are already in progress, and some of them are under
							final touch. I hope you will find them useful, inspiring, or fun.
							Stay tuned! 😊
						</Text>
					</GlowCard>
				</Container>
			</Flex>
		</>
	);
};

export default Page;
