import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Justin J Daniel",
	description:
		"This is my portfolio website where I showcase my skills and projects as a blockchain software developer.",
	openGraph: {
		title: "justinjdaniel.com",
		description: "Blockchain software developer",
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

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
