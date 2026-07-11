import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);
  return { metadata: data, content };
}

function getMDXData(dir) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));
    return {
      metadata,
      slug,
      content,
      date: new Date(metadata.publishedAt), // Precompute date
    };
  });
}

export function getBlogPosts() {
  const posts = getMDXData(path.join(process.cwd(), "content"));

  // Sort posts by publishedAt date (newest first)
  posts.sort((a, b) => {
    // Use precomputed date for comparison
    return b.date - a.date; // Descending order (latest first)
  });

  return posts;
}
