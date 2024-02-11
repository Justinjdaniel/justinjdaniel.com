import "./globals.css";
import AnalyticsGTM from "@/components/analytics";
import Header from "@/components/header";
import IntroAnimation from "@/components/intro-animation";
import Particles from "@/components/particles";
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
		"Programmer, Blockchain Developer, Web Developer, and UI/UX Designer.",
	openGraph: {
		title: "justinjdaniel.com",
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
		// TODO: change the favicon.ico to a new image with the name of the website.
		// assignees: justinjdaniel
		// labels: enhancement, fix-me, ui
		shortcut: "/favicon.png",
	},
};

export default function RootLayout({ children }) {
	// TODO: add intro animation
	// currently a small line is given as animation. Replace that with a goof loading animation. Also add a time delay at on load only, currently fade in animation is given to the homepage.
	// assignees: justinjdaniel
	// labels: enhancement, feature-request, ui

	return (
		<html lang="en">
			<body className={inter.className}>
				<main className="flex flex-col w-screen h-screen overflow-x-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
					<Particles
						className="absolute inset-0 -z-10 animate-fade-in"
						quantity={100}
					/>
					<div className="flex flex-col animate-fade-in">
						<Header />
						{children}
					</div>
					<IntroAnimation />
				</main>
				<Suspense>
					<Analytics />
					<AnalyticsGTM />
				</Suspense>
			</body>
		</html>
	);
}
