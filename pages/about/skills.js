import {
	Box,
	Container,
	Flex,
	Heading,
	chakra,
	keyframes,
} from "@chakra-ui/react";

import NextImage from "@/components/next-image";
import skillsData from "@/database/skills.json";
import { useEffect, useState } from "react";

const AboutSkills = (props) => {
	return (
		<Container maxW="2xl" centerContent {...props}>
			<Heading mb="2">Skills</Heading>
			<TagsComponent />
		</Container>
	);
};

export default AboutSkills;

const loop = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const InfiniteLoopSlider = ({ children, duration, reverse = false }) => {
	return (
		<Box
			sx={{
				"--duration": `${duration}ms`,
				"--direction": reverse ? "reverse" : "normal",
			}}
		>
			<Flex
				gap="2"
				w="fit-content"
				animation={`${loop}`}
				sx={{
					animationDuration: "var(--duration)",
					animationDirection: "var(--direction)",
					animationTimingFunction: "linear",
					animationIterationCount: "infinite",
					// animationFillMode: "forwards",
					// animationPlayState: "running",
					// animationDelay: "0s",
				}}
			>
				{children}
				{children}
			</Flex>
		</Box>
	);
};

const Tag = ({ text, icon }) => (
	<Flex
		w="auto"
		px="5"
		py="2"
		gap="2"
		mr="1rem"
		rounded="md"
		bgColor="white"
		alignItems="center"
		justifyContent="center"
		boxShadow="0 0.1rem 0.2rem rgb(0 0 0 / 20%), 0 0.1rem 0.5rem rgb(0 0 0 / 30%), 0 0.2rem 1.5rem rgb(0 0 0 / 40%)"
	>
		<NextImage width="15" height="15" src={icon} alt={text} />
		<chakra.span
			style={{
				whiteSpace: "nowrap",
			}}
		>
			{text}
		</chakra.span>
	</Flex>
);

const TagsComponent = (props) => {
	const LANGUAGES = skillsData.Languages;
	const FRAMEWORKS = skillsData.Frameworks;
	const TOOLS = skillsData.Tools;

	const DURATION = 60000;
	const ROWS = 5;
	const TAGS_PER_ROW = 32;

	const [shuffledTags, setShuffledTags] = useState([]);

	const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
	const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

	useEffect(() => {
		// create a function to shuffle the tags
		const shuffled = shuffle([...LANGUAGES, ...FRAMEWORKS, ...TOOLS]);
		setShuffledTags(shuffled);
	}, [FRAMEWORKS, LANGUAGES, TOOLS]);

	return (
		<Flex
			gap={4}
			py={6}
			maxWidth="full"
			color="black"
			flexShrink={0}
			flexDirection="column"
			position="relative"
			overflow="hidden"
			{...props}
		>
			{[...new Array(ROWS)].map((_, i) => (
				<InfiniteLoopSlider
					// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={i}
					duration={random(DURATION - 15000, DURATION + 10000)}
					// duration={DURATION}
					reverse={i % 2}
				>
					{shuffledTags.slice(0, TAGS_PER_ROW).map((tag) => (
						<Tag text={tag.name} icon={tag.icon} key={tag.name} />
					))}
				</InfiniteLoopSlider>
			))}
			<Box
				pointerEvents="none"
				pos="absolute"
				inset="0"
				background="linear-gradient(90deg, #090c10, transparent 30%, transparent 70%, #090c10)"
			/>
		</Flex>
	);
};
