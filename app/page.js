import { css } from "@/styled-system/css";
import Particles from "@components/particles";
import Link from "next/link";

const navigation = [
	{ name: "Projects", href: "/projects" },
	{ name: "Contact", href: "/contact" },
];

export default function Home() {
	return (
		<div
			className={css({
				display: "flex",
				flexDir: "column",
				alignItems: "center",
				justifyContent: "center",
				w: "screen",
				h: "screen",
				overflow: "hidden",
				bgGradient: "to-tl",
				gradientFrom: "black",
				gradientVia: "zinc.900",
				gradientTo: "black",
			})}
		>
			<Particles
				className={css({ pos: "absolute", inset: "0" })}
				quantity={100}
			/>
			<nav
				className={css({ my: "16", animation: "fadeIn 500ms", zIndex: "1" })}
			>
				<ul
					className={css({
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						gap: "4",
					})}
				>
					{navigation.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={css({
								fontSize: "sm",
								lineHeight: "sm",
								transitionDuration: "500ms",
								color: { base: "zinc.500", _hover: "zinc.300" },
							})}
						>
							{item.name}
						</Link>
					))}
				</ul>
			</nav>
			<div
				className={css({
					display: "none",
					w: "screen",
					h: "px",
					md: { display: "block" },
					bgImage: "gradient.to-r",
				})}
			/>
			<h1
				className={css({
					zIndex: "10",
					fontWeight: "semibold",
					color: "transparent",
					transitionDuration: "1000",
					bgColor: "white",
					cursor: "default",
					sm: { fontSize: "2xl", lineHeight: "2xl" },
					md: { fontSize: "6xl", lineHeight: "6xl" },
					whiteSpace: "nowrap",
					bgClip: "text",
				})}
			>
				Design, Code & Build.
			</h1>
			<div
				className={css({
					my: "16",
					textAlign: "center",
					zIndex: "1",
				})}
			>
				<h2
					className={css({
						fontSize: "sm",
						lineHeight: "sm",
						color: "zinc.500",
					})}
				>
					Hi, my name is Justin, I'm a software blockchain developer at{"  "}
					<Link
						target="_blank"
						href="https://justinjdaniel.com"
						className={css({
							textDecorationLine: "underline",
							transitionDuration: "500",
							_hover: { color: "zinc.300" },
						})}
					>
						JustinJDaniel
					</Link>
				</h2>
			</div>
		</div>
	);
}
