import { getBlogPosts } from "@/db/blog";

export default async function sitemap() {
	const blogs = getBlogPosts().map((post) => ({
		url: `https://justinjdaniel.com/blog/${post.slug}`,
		lastModified: post.metadata.publishedAt,
	}));

	const routes = ["", "/blog", "/projects", "/uses"].map((route) => ({
		url: `https://justinjdaniel.com${route}`,
		lastModified: new Date().toISOString().split("T")[0],
	}));

	return [...routes, ...blogs];
}
