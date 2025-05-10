import DrawSVG from "@/_components/icons/doodle-library-hand-drawn-vectors/draw-svg";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center">
        {/* Custom Doodle SVG Icon */}
        <div className="mb-6 flex justify-center items-center">
          <span className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-2">
            <DrawSVG>
              <svg
                viewBox="0 0 400 400"
                fill="none"
                className="block w-16 h-16 text-emerald-500"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M197.001 244C171.822 271.83 126.998 313 104.256 295.496C81.5174 277.992 126.998 246 156.656 220.314"
                  stroke="currentColor"
                  strokeOpacity="0.9"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M165.944 196.347C135.998 107 276.999 75.9996 300.776 165.974C319.017 235 211.46 292.164 175.314 213.85"
                  stroke="currentColor"
                  strokeOpacity="0.9"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </DrawSVG>
          </span>
        </div>
        <h2 className="font-bold text-3xl md:text-4xl mb-4 text-zinc-900 dark:text-zinc-100 tracking-tight">
          Blog Post Not Found
        </h2>
        <p className="mb-6 text-zinc-700 dark:text-zinc-300 text-base md:text-lg">
          Sorry, we couldn't find the blog post you were looking for.
        </p>
        <Link
          href="/blog"
          className="inline-block px-6 py-3 rounded-full bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-all"
        >
          View All Posts
        </Link>
      </div>
    </section>
  );
}
