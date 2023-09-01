import { fullDate } from "../_utils/format-date";
import { formatDate } from "@/utils/format-date";
import { allBlogs } from "contentlayer/generated";
import Link from "next/link";

export const metadata = {
	title: "Blog",
	description: "Read my thoughts on software development, design, and more.",
};

export default async function BlogPage() {
	console.log(allBlogs);
	return (
		<section className="z-10 antialiased max-w-2xl mb-40 mx-4 mt-8 lg:mx-auto w-full">
			<h1 className="font-bold text-2xl mb-8 tracking-tighter">Read my blog</h1>

			{allBlogs.length === 0 && <p>No blogs yet.</p>}
			{allBlogs.map((post) => (
				<Link
					key={post.slug}
					className="flex flex-col space-y-1 mb-4"
					href={`/blog/${post.slug}`}
				>
					<div className="w-full flex flex-col">
						<div className="flex flex-row justify-between">
							<p className="text-neutral-900 dark:text-neutral-100 tracking-tight max-w-[520px] mb-1">
								{post.title}
							</p>
							<span className="text-sm text-neutral-600 dark:text-neutral-400 ml-auto py-1">
								{fullDate(post.publishedAt)}
							</span>
						</div>
						<p className="text-sm text-neutral-600 dark:text-neutral-400">
							{post.summary}
						</p>
					</div>
				</Link>
			))}
		</section>
	);
}
