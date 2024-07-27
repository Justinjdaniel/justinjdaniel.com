/**
 * Formats a given date into a relative time string and a full date string.
 *
 * @param {string | Date} date - The date to format.
 * @returns {string} - The formatted date string in the format "full date (relative time)".
 */ 
export function formatDate(date) {
	const currentDate = new Date();
	const targetDate = new Date(date);

	// Create a new Intl.RelativeTimeFormat object with the 'en-us' locale and 'auto' numeric style
	const rtf = new Intl.RelativeTimeFormat("en-us", { numeric: "auto" });

	// Calculate the difference between the current date and the target date in milliseconds
	const diff = targetDate - currentDate;

	// Define the units and their corresponding values in milliseconds
	const units = {
		year: 24 * 60 * 60 * 1000 * 365,
		month: (24 * 60 * 60 * 1000 * 365) / 12,
		day: 24 * 60 * 60 * 1000,
		hour: 60 * 60 * 1000,
		minute: 60 * 1000,
		second: 1000,
	};

	// Loop through the units and find the first one that is larger than the absolute value of the difference
	for (const unit in units) {
		if (Math.abs(diff) > units[unit] || unit === "second") {
			// Call the format method with the value and unit of the relative time
			const formattedDate = rtf.format(Math.round(diff / units[unit]), unit);

			// Format the target date as a full date
			const fullDate = targetDate.toLocaleString("en-us", {
				month: "long",
				day: "numeric",
				year: "numeric",
			});

			// Return the full date and the formatted date in parentheses
			return `${fullDate} (${formattedDate})`;
		}
	}
}

/**
 * Formats a given date into a full date string.
 *
 * @param {Date|string} date - The date to format.
 * @return {string} The formatted date string in the format "month day, year".
 */
export function fullDate(date) {
	const targetDate = new Date(date);

	// Format the target date as a full date
	const fullDate = targetDate.toLocaleString("en-us", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	return fullDate;
}
