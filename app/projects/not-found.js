import Link from "next/link";
import MindBlownIcon from "@/_components/icons/doodle-library-hand-drawn-vectors/mind-blown";
import DrawSVG from "@/_components/icons/draw-svg";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center">
        <div className="mb-6 flex justify-center items-center">
          <span className="inline-block rounded-full bg-pink-100 dark:bg-pink-900/30 p-4">
            <DrawSVG>
              <MindBlownIcon className="w-16 h-16 text-pink-500" />
            </DrawSVG>
          </span>
        </div>
        <h2 className="font-bold text-2xl md:text-3xl mb-4 text-zinc-900 dark:text-zinc-100 tracking-tight">
          Project Not Found
        </h2>
        <p className="mb-6 text-zinc-700 dark:text-zinc-300 text-base md:text-lg">
          Sorry, we couldn&apos;t find the project you&apos;re looking for.
        </p>
        <Link
          href="/projects"
          className="inline-block px-6 py-3 rounded-full bg-pink-500 text-white font-medium hover:bg-pink-600 transition-all"
        >
          Back to Projects
        </Link>
      </div>
    </section>
  );
}
