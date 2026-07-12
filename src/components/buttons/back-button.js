"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ className = "" }) {
  const router = useRouter();

  const goBack = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        router.back();
      });
    } else {
      router.back();
    }
  };

  return (
    <button
      type="button"
      onClick={goBack}
      aria-label="Go back"
      className={`
        !fixed top-8 left-6 md:top-8 md:left-8 z-[9999]
        hidden md:flex items-center justify-center p-2
        bg-zinc-100/80 dark:bg-zinc-800/80
        border border-black/[0.1] dark:border-white/[0.1]
        rounded-full
        text-zinc-900 dark:text-zinc-100
        shadow-md backdrop-blur-sm
        transition-all duration-200 ease-out
        hover:bg-indigo-500 hover:text-white hover:scale-105
        animate-in slide-in-from-left
        ${className}
      `}
    >
      <svg
        className="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        role="img"
        aria-hidden="true"
      >
        <title>Back arrow</title>
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
    </button>
  );
}
