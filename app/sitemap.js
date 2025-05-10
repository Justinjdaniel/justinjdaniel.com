import { getBlogPosts } from "@/_db/blog";

export const baseUrl = "https://justinjdaniel.com";

export default async function sitemap() {
  const blogs = await getBlogPosts();

  const blogEntries = blogs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = ["", "/blog"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogEntries];
}
