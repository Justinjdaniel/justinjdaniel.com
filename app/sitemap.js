import { allBlogs } from "contentlayer/generated";

export default async function sitemap() {
	const blogs = allBlogs.map((post) => ({
		url: `https://justinjdaniel.com/blog/${post.slug}`,
		lastModified: post.publishedAt,
	}));

	const routes = ["", "/blog", "/projects", "/uses"].map((route) => ({
		url: `https://justinjdaniel.com${route}`,
		lastModified: new Date().toISOString().split("T")[0],
	}));

	return [...routes, ...blogs];
}