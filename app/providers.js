// app/providers.js
"use client";

import theme from "@/theme";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }) {
	return (
		<CacheProvider>
			<ChakraProvider
				theme={theme}
				toastOptions={{
					defaultOptions: { position: "top", duration: 3000, isClosable: true },
				}}
			>
				{children}
			</ChakraProvider>
		</CacheProvider>
	);
}
