import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req) {
	const { searchParams } = req.nextUrl;
	const postTitle = searchParams.get("title");
	const font = fetch(
		new URL("../../public/fonts/BowlbyOne-Regular.ttf", import.meta.url),
	).then((res) => res.arrayBuffer());
	const fontData = await font;

	return new ImageResponse(
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				justifyContent: "center",
				backgroundImage: "url(http://localhost:3000/images/og-bg.png)",
			}}
		>
			<div
				style={{
					marginLeft: 135,
					marginRight: 135,
					display: "flex",
					fontSize: 90,
					fontFamily: "Bowlby One",
					// letterSpacing: "-0.05em",
					fontStyle: "normal",
					color: "white",
					lineHeight: "90px",
					whiteSpace: "pre-wrap",
				}}
			>
				{postTitle}
			</div>
		</div>,
		{
			width: 1920,
			height: 1080,
			fonts: [
				{
					name: "Bowlby One",
					data: fontData,
					style: "normal",
				},
			],
		},
	);
}
