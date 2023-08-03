import AnalyticsGTM from "@components/analytics";
import { Analytics } from "@vercel/analytics/react";
import { Fira_Code, Inter } from "next/font/google";
import { Suspense } from "react";
import { css } from "@/styled-system/css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const FiraCode = Fira_Code({
	weight: ["400", "500", "700"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-fira-code",
});

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
				<main
					className={css({
						minW: "0",
						flex: "auto",
						display: "flex",
						flexDir: "column",
						color: "stone.100",
					})}
				>
					{/* <Sidebar /> */}
					{children}
					<Suspense>
						<Analytics />
						<AnalyticsGTM />
					</Suspense>
				</main>
			</body>
		</html>
	);
}
