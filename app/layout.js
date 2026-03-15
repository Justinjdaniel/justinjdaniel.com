import MicrosoftClarity from "@components/analytics/microsoft-clarity";
import Footer from "@components/layout/footer";
import Header from "@components/layout/header";
import Particles from "@components/ui/particles";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, JetBrains_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { GTM_ID } from "../lib/gtm";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://justinjdaniel.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Justin J Daniel",
    template: "%s | Justin Daniel",
  },
  description: "Fullstack developer, optimist, researcher.",
  keywords: "fullstack, developer, blockchain, researcher",
  author: "Justin Daniel",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${jetbrainsMono.className} scroll-smooth`}
    >
      <body className="font-sans bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 antialiased tracking-tight">
        <NextTopLoader height={4} color="#818cf8" showSpinner={false} />
        <div className="min-h-screen grid relative dark:bg-zinc-900/95 bg-zinc-50/95 text-zinc-800 dark:text-zinc-200">
          {/* Particles as background */}
          <Particles
            className="col-start-1 row-start-1 animate-fade-in"
            quantity={500}
          />
          {/* Foreground content */}
          <Header />
          <main className="col-start-1 row-start-1 mx-auto w-full space-y-6">
            {children}
          </main>
          <Footer />
        </div>

        <Suspense fallback={null}>
          <GoogleTagManager gtmId={GTM_ID} />
        </Suspense>

        {/* Microsoft Clarity Analytics */}
        {process.env.NODE_ENV === "production" && <MicrosoftClarity />}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
