import "./globals.css";
import AnalyticsGTM from "@/components/analytics";
import Header from "@/components/header";
import IntroAnimation from "@/components/intro-animation";
import Particles from "@/components/particles";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	metadataBase: new URL("https://justinjdaniel.com"),
	title: {
		default: "Justin J Daniel",
		template: "%s | Justin J Daniel",
	},
	description:
		"Programmer, Blockchain Developer, Web Developer, and UI/UX Designer.",
	openGraph: {
		title: "Justin J Daniel",
		description:
			"Programmer, Blockchain Developer, Web Developer, and UI/UX Designer.",
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
		shortcut: "/favicon.ico",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="scroll-smooth">
			<body className={inter.className}>
				<NextTopLoader />
				<main className="flex flex-col min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black overflow-x-hidden">
					<Particles className="fixed inset-0 -z-10" quantity={150} refresh />
					<IntroAnimation />
					<div className="flex flex-col animate-fade-in text-pretty">
						<Header />
						{children}
					</div>
				</main>
				<Suspense>
					<Analytics />
					<AnalyticsGTM />
				</Suspense>
			</body>
		</html>
	);
}
