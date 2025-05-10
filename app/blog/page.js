import BackButton from "@/_components/buttons/back-button";
import BookDoodleIcon from "@/_components/icons/doodle-library-hand-drawn-vectors/book";
import { getBlogPosts } from "@/_db/blog";
import { formatDate } from "@/_utils/format-date";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
};

export default function BlogPage() {
  const allBlogs = getBlogPosts();

  return (
    <section className="z-10 antialiased max-w-2xl m-4 mt-16 md:mx-auto">
      <BackButton />
      <div className="flex items-center mb-6">
        <BookDoodleIcon className="w-16 h-16 md:w-16 md:h-16 text-zinc-900 dark:text-zinc-100" />
        <h2 className="text-balance text-4xl md:text-4xl font-sans text-zinc-900 dark:text-zinc-100">
          My Articles & Updates
        </h2>
      </div>

      {allBlogs.length === 0 && <p>No blogs yet.</p>}

      <div className="grid gap-8">
        {allBlogs
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <Link
              key={post.slug}
              className="
                group p-4 rounded-lg border border-transparent
                hover:bg-zinc-100 dark:hover:bg-zinc-800/50
                hover:border-zinc-200 dark:hover:border-zinc-700/50
                transition-all duration-200
                animate-in fade-in-50
              "
              href={`/blog/${post.slug}`}
            >
              <div className="flex flex-col gap-2">
                <time className="text-sm text-zinc-600 dark:text-zinc-400">
                  {formatDate(post.metadata.publishedAt)}
                </time>
                <h2
                  className="
                  text-xl font-semibold text-zinc-900 dark:text-zinc-100
                  tracking-tight group-hover:text-indigo-500 transition-colors
                "
                >
                  {post.metadata.title}
                </h2>
                <Suspense fallback={<div className="h-6" />}>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                    {post.metadata.summary}
                  </p>
                </Suspense>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
