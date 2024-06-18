import { getBlogPosts } from "@/db/blog";
import { formatDate } from "@/utils/format-date";
import { Link } from "next-view-transitions";
import { Suspense } from "react";

export const metadata = {
	title: "Blog",
	description: "Read my thoughts on software development, design, and more.",
};

export default function BlogPage() {
	const allBlogs = getBlogPosts();

	return (
		<section className="z-10 antialiased max-w-2xl mb-40 mx-4 mt-8 md:mx-auto">
			<h1 className="font-medium text-2xl mb-8 tracking-tighter">
				Read my blog
			</h1>

			{allBlogs.length === 0 && <p>No blogs yet.</p>}
			{allBlogs
				.sort((a, b) => {
					if (
						new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
					) {
						return -1;
					}
					return 1;
				})
				.map((post) => (
					<Link
						key={post.slug}
						className="flex flex-col space-y-1 mb-4"
						href={`/blog/${post.slug}`}
					>
						<div className="w-full flex flex-col">
							<span className="text-xs text-neutral-800 dark:text-neutral-200 py-2">
								{formatDate(post.metadata.publishedAt)}
							</span>
							<p className="title font-bold text-neutral-900 dark:text-neutral-100 tracking-tight max-w-[640px] mb-1">
								{post.metadata.title}
							</p>
							<Suspense fallback={<p className="h-6" />}>
								<p className="text-sm text-neutral-600 dark:text-neutral-400">
									{post.metadata.summary}
								</p>
							</Suspense>
						</div>
					</Link>
				))}
		</section>
	);
}
