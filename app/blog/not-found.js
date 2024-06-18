import { Link } from "next-view-transitions";
import { headers } from "next/headers";

export default async function NotFound() {
	const headersList = headers();
	const domain = headersList.get("host");
	// const data = await getSiteData(domain);
	return (
		<div>
			<h2>Not Found!</h2>
			<p>Could not find requested resource</p>
			<p>
				View <Link href="/blog">all posts</Link>
			</p>
		</div>
	);
}
