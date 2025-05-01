import { Analytics } from "@vercel/analytics/react";
import { Inter, JetBrains_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { unstable_ViewTransition as ViewTransition } from "react";
import Footer from "./_components/footer";
import GoogleTagManager from "./_components/google-tag-manager";
import "./globals.css";

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
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="font-sans bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 antialiased tracking-tight">
        <NextTopLoader height={4} color="#818cf8" showSpinner={false} />
        <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 dark:bg-zinc-900/95 bg-zinc-50/95 text-zinc-800 dark:text-zinc-200">
          <main className="max-w-[75ch] mx-auto w-full space-y-6">
            <ViewTransition mode="out-in">{children}</ViewTransition>
          </main>
          <Footer />
        </div>
        <GoogleTagManager />
        <Analytics />
      </body>
    </html>
  );
}
