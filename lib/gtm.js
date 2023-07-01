export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

export const pageview = (url) => {
	if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") {
		return null;
	}
	window.dataLayer.push({
		event: "pageview",
		page: url,
	});
};
