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

// MARK: Metadata
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

// MARK: Layout
export default function RootLayout({ children }) {
	return (
		<html lang="en" className="scroll-smooth">
			<body className={inter.className}>
				<NextTopLoader />
				<main className="flex flex-col h-[100dvh] bg-gradient-to-tl from-black via-zinc-600/20 to-black overflow-x-hidden">
					<Particles className="fixed inset-0 -z-10" quantity={150} refresh />
					<IntroAnimation />
					<content className="overflow-hidden animate-appear">
						<div
							className="flex flex-col animate-[fade-in_1.5s_linear_forwards] text-pretty overflow-auto"
							style={{ animationDelay: "-0.5s" }}
						>
							<Header />
							{children}
						</div>
					</content>
				</main>
				<Suspense>
					<Analytics />
					<AnalyticsGTM />
				</Suspense>
			</body>
		</html>
	);
}
