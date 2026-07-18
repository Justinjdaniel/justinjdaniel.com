"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import GitHubIcon from "../icons/simple-icons/github";
import LinkedInIcon from "../icons/simple-icons/linked-in";

const NAVIGATION_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
];

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/justinjdaniel",
    icon: (
      <GitHubIcon className="w-4 h-4 md:w-5 md:h-5 fill-zinc-800/90 dark:fill-zinc-200/90" />
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/justinjdaniel",
    icon: (
      <LinkedInIcon className="w-4 h-4 md:w-5 md:h-5 fill-zinc-800/90 dark:fill-zinc-200/90" />
    ),
  },
];

export default function Header({ className = "" }) {
  const pathname = usePathname();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800 ${className}`}
    >
      <div className="max-w-[75ch] mx-auto px-6 py-2 flex items-center justify-between">
        <nav className="flex items-center space-x-6">
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  relative text-sm font-medium transition-colors duration-200
                  ${
                    isActive
                      ? "text-indigo-500"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  }
                  after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] 
                  after:bg-indigo-500 after:scale-x-0 hover:after:scale-x-100 
                  after:transition-transform after:duration-300 after:ease-out
                  ${isActive ? "after:scale-x-100" : ""}
                `}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-4">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-all duration-200 hover:scale-110"
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
