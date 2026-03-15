import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  // Note: Using the Rust compiler means we cannot use
  // rehype or remark plugins. For my app, this is fine.
  experimental: {
    mdxRs: true,
    viewTransition: true,
  },
  // turbopack: {
  //   resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".json"],
  // },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
