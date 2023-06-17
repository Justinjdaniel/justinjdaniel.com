// pages/_app.js
import Layout from "@/components/templates/layout";
import theme from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider
			theme={theme}
			toastOptions={{
				defaultOptions: { position: "top", duration: 3000, isClosable: true },
			}}
		>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ChakraProvider>
	);
}

export default MyApp;
