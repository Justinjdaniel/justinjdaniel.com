import Link from "next/link";
import ArrowWideDoodleIcon from "../icons/doodle-library-hand-drawn-vectors/arrow-wide";

// Utility to limit words and add ellipsis
function limitWords(str, maxWords = 6) {
  const words = str.split(" ");
  if (words.length <= maxWords) return str;
  return `${words.slice(0, maxWords).join(" ")}…`;
}

export default function PrevNextNav({ prevPost, nextPost, className = "" }) {
  if (!prevPost && !nextPost) return null;

  // Fixed width for both buttons
  const btnWidth = "w-56 min-w-[220px] max-w-[90vw]";

  return (
    <nav
      className={`flex justify-between items-center gap-4 mb-8 pb-8 ${className}`}
    >
      {prevPost ? (
        <Link
          href={`/blog/${prevPost.slug}`}
          className={`flex items-center gap-3 px-4 py-3 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition ${btnWidth}`}
          aria-label={`Previous post: ${prevPost.metadata.title}`}
        >
          <ArrowWideDoodleIcon className="w-10 h-10 flex-shrink-0 -scale-x-100" />
          <span className="flex flex-col items-start justify-center leading-snug text-left w-full">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Previous
            </span>
            <span className="font-medium break-words line-clamp-2">
              {limitWords(prevPost.metadata.title, 10)}
            </span>
          </span>
        </Link>
      ) : (
        <div className={btnWidth} />
      )}

      {nextPost ? (
        <Link
          href={`/blog/${nextPost.slug}`}
          className={`flex items-center gap-3 px-4 py-3 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition ${btnWidth} justify-end`}
          aria-label={`Next post: ${nextPost.metadata.title}`}
        >
          <span className="flex flex-col items-end justify-center leading-snug text-right w-full">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Next
            </span>
            <span className="font-medium break-words line-clamp-2">
              {limitWords(nextPost.metadata.title, 10)}
            </span>
          </span>
          <ArrowWideDoodleIcon className="w-10 h-10 flex-shrink-0" />
        </Link>
      ) : (
        <div className={btnWidth} />
      )}
    </nav>
  );
}
