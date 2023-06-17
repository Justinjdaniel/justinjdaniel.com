import BackButton from "@/components/buttons/back-button";
import { Flex } from "@chakra-ui/react";
import Footer from "./footer";
import Header from "./header";

const PagesLayout = ({ children }) => {
	return (
		<Flex
			minH="100dvh"
			bg="#050609"
			// bg='blackAlpha.800'
		>
			<Header>
				<BackButton />
			</Header>
			{children}
			<Footer />
		</Flex>
	);
};

export default PagesLayout;
