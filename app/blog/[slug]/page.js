import { Mdx } from "@/components/mdx";
import { formatDate } from "@/utils/format-date";
import { allBlogs } from "contentlayer/generated";
import Image from "next/image";
import { notFound } from "next/navigation";
import Balancer from "react-wrap-balancer";

/**
 * Generate metadata for a blog post.
 *
 * @param {Object} params - The parameters for generating the metadata
 * @return {Object} The metadata object containing title, description, openGraph, and twitter information
 */
export async function generateMetadata({ params }) {
	const post = allBlogs.find((post) => post.slug === params.slug);
	if (!post) {
		return;
	}

	const {
		title,
		publishedAt: publishedTime,
		summary: description,
		image,
		slug,
	} = post;
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
	const post = allBlogs.find((post) => post.slug === params.slug);

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
					__html: JSON.stringify(post.structuredData),
				}}
			/>
			<h1 className="font-bold text-2xl tracking-tighter max-w-[650px] mb-2">
				<Balancer>{post.title}</Balancer>
			</h1>
			<h3 className="text-sm text-neutral-800 dark:text-neutral-200">
				{post.summary}
			</h3>
			<div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
				<p className="text-sm text-neutral-600 dark:text-neutral-400">
					{formatDate(post.publishedAt)}
				</p>
			</div>
			{post.image && (
				<Image
					alt={`${post.title} cover image`}
					src={post.image}
					width="500"
					height="500"
					priority="true"
					className="rounded-lg object-cover h-80 w-full object-left"
				/>
			)}
			<Mdx code={post.body.code} />
		</section>
	);
}
