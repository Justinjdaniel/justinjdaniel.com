import { css } from "@/styled-system/css";

export default function PagesLayout({ children }) {
	return (
		<div
			className={css({
				pos: "relative",
				minH: "screen",
				bgGradient: "to-tl",
				gradientFrom: "black",
				gradientVia: "zinc.900",
				gradientTo: "black",
				minW: "0",
				flex: "auto",
				display: "flex",
				flexDir: "column",
				color: "stone.100",
			})}
		>
      {/* Header */}
			{children}
      {/* Footer */}
		</div>
	);
}
