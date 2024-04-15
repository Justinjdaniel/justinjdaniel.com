import BackToTopButton from "@/components/buttons/back-to-top";
import { CustomMDX } from "@/components/mdx";
import ScrollIndicator from "@/components/scroll-indicator";
import { getBlogPosts } from "@/db/blog";
import { formatDate } from "@/utils/format-date";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

/**
 * Generate metadata for a blog post.
 *
 * @param {Object} params - The parameters for generating the metadata
 * @return {Object} The metadata object containing title, description, openGraph, and twitter information
 */
export async function generateMetadata({ params }) {
	const post = getBlogPosts().find((post) => post.slug === params.slug);
	if (!post) {
		return;
	}

	const {
		title,
		publishedAt: publishedTime,
		summary: description,
		image,
		slug,
	} = post.metadata;
	const ogImage = image
		? `https://justinjdaniel.com${image}`
		: `https://justinjdaniel.com/og?title=${title}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "article",
			publishedTime,
			url: `https://justinjdaniel.com/blog/${slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImage],
		},
	};
}

/**
 * Function for rendering a blog post based on the provided parameters.
 *
 * @param {Object} params - The parameters for the blog post
 * @return {JSX.Element} The blog post section component
 */
export default async function Blog({ params }) {
	const post = getBlogPosts().find((post) => post.slug === params.slug);

	if (!post) {
		notFound();
	}

	return (
		<section className="z-10 antialiased max-w-2xl mb-40 mx-4 mt-8 md:mx-auto">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				// rome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BlogPosting",
						headline: post.metadata.title,
						datePublished: post.metadata.publishedAt,
						dateModified: post.metadata.publishedAt,
						description: post.metadata.summary,
						image: post.metadata.image
							? `https://justinjdaniel.com${post.metadata.image}`
							: `https://justinjdaniel.com/og?title=${post.metadata.title}`,
						url: `https://justinjdaniel.com/blog/${post.slug}`,
						author: {
							"@type": "Person",
							name: "Justin J Daniel",
						},
					}),
				}}
			/>
			<ScrollIndicator />
			<h1 className="title font-bold text-2xl tracking-tighter max-w-[650px] mb-2">
				{post.metadata.title}
			</h1>
			<div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
				<Suspense fallback={<p className="h-5" />}>
					<p className="text-sm text-neutral-600 dark:text-neutral-400">
						{formatDate(post.metadata.publishedAt)}
					</p>
				</Suspense>
			</div>
			{post.metadata.image && (
				<Image
					alt={`${post.metadata.title} cover image`}
					src={post.metadata.image}
					width="500"
					height="500"
					priority="true"
					className="rounded-lg object-cover h-80 w-full object-left"
				/>
			)}
			<article className="prose prose-quoteless prose-neutral dark:prose-invert">
				<CustomMDX source={post.content} />
			</article>
			<BackToTopButton />
		</section>
	);
}
