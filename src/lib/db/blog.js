import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content");

export function getBlogPosts() {
  const mdxFiles = fs
    .readdirSync(contentDir)
    .filter((file) => path.extname(file) === ".mdx");

  const posts = mdxFiles.map((file) => {
    const filePath = path.join(contentDir, file);
    const rawContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(rawContent);
    const slug = path.basename(file, path.extname(file));

    return {
      metadata: data,
      slug,
      content,
      date: new Date(data.publishedAt),
    };
  });

  return posts.sort((a, b) => b.date - a.date);
}
