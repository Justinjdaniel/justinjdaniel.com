import GlowCard from "@/components/cards/cursor-glow-card";
import certifications from "@/database/certifications.json";
import { Avatar, Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Link from "next/link";

const Certifications = () => {
	const cardStyle = {
		p: "4",
		w: "19rem",
		h: "10rem",
		gap: "2",
		alignItems: "center",
	};

	return (
		<>
			<Heading mb="4">Certifications</Heading>
			<SimpleGrid
				minChildWidth="18rem"
				justifyItems="stretch"
				alignItems="stretch"
				spacing="6"
				mb="6"
			>
				{certifications.map((certification, i) => (
					<GlowCard
						cardProps={{
							as: Link,
							href: certification.link || "#",
							target: "_blank",
							rel: "noreferrer",
							key: i,
						}}
						// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={i}
						{...cardStyle}
					>
						<Avatar src={certification.icon} name={certification.issuedBy} />
						<Box w="full" p="2">
							<Heading as="h4" size="sm" mb="1">
								{certification.title}
							</Heading>
							<Text fontSize="sm" color="gray.200">
								{certification.issuedBy}
							</Text>
							<Text fontSize="sm" color="gray.500">
								Issued on {certification.issuedDate}
							</Text>
							<Text fontSize="xs" color="gray.500">
								Credential ID {certification.credentials}
							</Text>
						</Box>
					</GlowCard>
				))}
			</SimpleGrid>
		</>
	);
};

export default Certifications;
