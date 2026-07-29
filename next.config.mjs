import path from "node:path";
import { fileURLToPath } from "node:url";
import createMDX from "@next/mdx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["mdx", "js", "jsx"],
  transpilePackages: ["next-mdx-remote"],
  // Note: Using the Rust compiler means we cannot use
  // rehype or remark plugins. For my app, this is fine.
  experimental: {
    mdxRs: true,
    viewTransition: true,
  },
  turbopack: {
    root: __dirname,
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".json"],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
