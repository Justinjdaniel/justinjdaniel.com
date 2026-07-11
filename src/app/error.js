"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// biome-ignore lint/suspicious/noShadowRestrictedNames: intentional, `error` is a reserved prop in Next.js error boundaries
export default function Error({ error: errorObj, reset }) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(errorObj);
  }, [errorObj]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <span className="inline-block rounded-full bg-red-100 dark:bg-red-900/30 p-4">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
              />
            </svg>
          </span>
        </div>
        {/* Heading */}
        <h2 className="font-bold text-2xl md:text-3xl mb-4 text-zinc-900 dark:text-zinc-100 tracking-tight">
          Something went wrong!
        </h2>
        {/* Message */}
        <p className="mb-6 text-zinc-700 dark:text-zinc-300 text-base md:text-lg">
          An unexpected error occurred. Please try again, or return to the home
          page.
        </p>
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-3 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-all"
          >
            Try Again
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="px-6 py-3 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-all"
          >
            Go Home
          </button>
        </div>
      </div>
    </section>
  );
}
