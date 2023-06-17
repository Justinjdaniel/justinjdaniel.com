/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	output: "export",
	// Optional: Add a trailing slash to all paths `/about` -> `/about/`
	trailingSlash: true,
	// Optional: Change the output directory `out` -> `dist`
	distDir: "out",
	// Optional: Disable the image optimizer.
	images: {
		unoptimized: true,
		formats: ["image/avif", "image/webp"],
	},
	exportPathMap: async function (
		defaultPathMap,
		{ dev, dir, outDir, distDir, buildId },
	) {
		return {
			"/": { page: "/" },
			"/about": { page: "/about" },
			"/about/index.txt": { page: "/about" },
		};
	},
};

module.exports = nextConfig;
