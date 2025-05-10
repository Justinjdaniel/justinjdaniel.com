import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-sm border-t border-zinc-200 dark:border-zinc-800 mt-auto z-10">
      <div className="max-w-[75ch] mx-auto w-full py-4 px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <span>© {new Date().getFullYear()} Justin J Daniel.</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Built with ❤️</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/justinjdaniel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            aria-label="GitHub Profile"
          >
            <Image
              src="/icons/github.svg"
              alt="GitHub icon"
              width={20}
              height={20}
              className="transition-transform hover:scale-110"
            />
          </Link>
          <Link
            href="https://www.linkedin.com/in/justinjdaniel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Image
              src="/icons/linked-in.svg"
              alt="LinkedIn icon"
              width={20}
              height={20}
              className="transition-transform hover:scale-110"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
