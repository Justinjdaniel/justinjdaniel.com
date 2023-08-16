import "./globals.css";
import AnalyticsGTM from "@components/analytics";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	metadataBase: new URL("https://justinjdaniel.com"),
	title: {
		default: "Justin J Daniel",
		template: "%s | Justin J Daniel",
	},
	description:
		"Programmer, Blockchain Architect, Web Developer, Technical Advisor and UI/UX Designer.",
	openGraph: {
		title: "justinjdaniel.com",
		description:
			"Programmer, Blockchain Architect, Web Developer, Technical Advisor and UI/UX Designer.",
		url: "https://justinjdaniel.com",
		siteName: "justinjdaniel.com",
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
				<main>{children}</main>
				<Suspense>
					<Analytics />
					<AnalyticsGTM />
				</Suspense>
			</body>
		</html>
	);
}
