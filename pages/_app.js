// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@/components/layout";
import theme from "@/theme";

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
