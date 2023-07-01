"use client";

import { Container, Flex, Heading } from "@chakra-ui/layout";
import Head from "next/head";

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
				position="relative"
				alignItems="center"
				justifyContent="center"
				htmlFor="projects-page"
			>
				<Container mb="6">
					<Heading py="6">Featured</Heading>
					<Flex gap="6" flexDir="column">
						<Flex
							w="full"
							h="20rem"
							p="6"
							rounded="lg"
							flexDir="column"
							// alignItems="center"
							// justifyContent="center"
							border="1px solid"
							borderColor="whiteAlpha.200"
							bgGradient="linear(to-br, whiteAlpha.400, whiteAlpha.200, transparent)"
							style={{
								backdropFilter: "blur(5px)",
							}}
						>
							<Heading size="md">Project Pandora</Heading>
						</Flex>
						<Flex
							w="full"
							h="20rem"
							p="6"
							rounded="lg"
							flexDir="column"
							border="1px solid"
							borderColor="whiteAlpha.200"
							bgGradient="linear(to-br, whiteAlpha.400, whiteAlpha.200, transparent)"
							style={{
								backdropFilter: "blur(5px)",
							}}
						>
							<Heading size="md">Project Zodiac</Heading>
						</Flex>
						<Flex
							w="full"
							h="20rem"
							p="6"
							rounded="lg"
							flexDir="column"
							border="1px solid"
							borderColor="whiteAlpha.200"
							bgGradient="linear(to-br, whiteAlpha.400, whiteAlpha.200, transparent)"
							style={{
								backdropFilter: "blur(5px)",
							}}
						>
							<Heading size="md">Project Blue Sky</Heading>
						</Flex>
					</Flex>
				</Container>
			</Flex>
		</>
	);
};

export default Page;
