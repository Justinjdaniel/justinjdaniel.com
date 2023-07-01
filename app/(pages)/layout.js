"use client";

import BackButton from "@/components/buttons/back-button";
import Footer from "@/components/templates/footer";
import Header from "@/components/templates/header";
import { Flex } from "@chakra-ui/layout";

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
