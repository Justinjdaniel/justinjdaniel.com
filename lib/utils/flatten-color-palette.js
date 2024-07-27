/**
 * Flattens a nested color palette object into a single level object.
 *
 * @param {Object} palette - The nested color palette object.
 * @return {Object} The flattened color palette object.
 */
function flattenColorPalette(palette) {
	const colors = {};
	for (const [key, value] of Object.entries(palette)) {
		if (typeof value === "string") {
			colors[key] = value;
		} else {
			Object.assign(colors, flattenColorPalette(value));
		}
	}
	return colors;
}

export default flattenColorPalette;