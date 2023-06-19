"use client";

import BackButton from "@/components/buttons/back-button";
import Footer from "@/components/templates/footer";
import Header from "@/components/templates/header";
import { Flex } from "@chakra-ui/react";

export const metadata = {
	title: {
		default: "Justin J Daniel",
		template: "%s | Justin J Daniel",
	},
	description:
		"Programmer, Blockchain Architect, Web Developer, Technical Advisor, UI/UX Designer.",
	openGraph: {
		title: "justinjdaniel.com",
		description:
			"Programmer, Blockchain Architect, Web Developer, Technical Advisor, UI/UX Designer.",
		url: "https://justinjdaniel.com",
		siteName: "justinjdaniel.com",
		images: [
			{
				url: "https://justinjdaniel.com/og.png",
				width: 1920,
				height: 1080,
			},
		],
		locale: "en-US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: {
		shortcut: "/favicon.png",
	},
};

const AppRouterPagesLayout = ({ children }) => {
	return (
		<Flex
			minH="100dvh"
			bg="#050609"
			// bg='blackAlpha.800'
			style={{
				scrollbarGutter: "stable", // auto | stable && both-edges?
			}}
		>
			<Header>
				<BackButton />
			</Header>
			{children}
			<Footer />
		</Flex>
	);
};

export default AppRouterPagesLayout;
