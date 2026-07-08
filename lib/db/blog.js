import fs from "node:fs";
import path from "node:path";

const contentDir = path.join(process.cwd(), "content");

export function getBlogPosts() {
  const mdxFiles = fs
    .readdirSync(contentDir)
    .filter((file) => path.extname(file) === ".mdx");

  const posts = mdxFiles.map((file) => {
    const filePath = path.join(contentDir, file);
    const rawContent = fs.readFileSync(filePath, "utf-8");

    // Manually parse frontmatter to handle unquoted colons
    const match = /---\s*([\s\S]*?)\s*---/.exec(rawContent);
    const frontMatterBlock = match[1];
    const content = rawContent.replace(/---\s*([\s\S]*?)\s*---/, "").trim();
    const metadata = {};

    frontMatterBlock
      .trim()
      .split("\n")
      .forEach((line) => {
        const colonIndex = line.indexOf(": ");
        if (colonIndex !== -1) {
          const key = line.slice(0, colonIndex).trim();
          let value = line.slice(colonIndex + 1).trim();
          value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove outer quotes
          metadata[key] = value;
        }
      });

    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
      date: new Date(metadata.publishedAt),
    };
  });

  return posts.sort((a, b) => b.date - a.date);
}
