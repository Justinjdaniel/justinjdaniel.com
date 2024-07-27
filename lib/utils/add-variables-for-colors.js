import flattenColorPalette from "./flatten-color-palette";

/**
 * This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
 *
 * @param {Object} { addBase, theme } - The plugin API provided by Tailwind CSS.
 */
function addVariablesForColors({ addBase, theme }) {
	const allColors = flattenColorPalette(theme("colors"));
	const newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
	);
	addBase({
		":root": newVars,
	});
}

export default addVariablesForColors;