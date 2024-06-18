"use client";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import React from "react";

/**
 * Defines the navigation items array.
 */
const navItems = {
	"/": {
		name: "Home",
	},
	"/blog": {
		name: "Blog",
	},
	// "/project": {
	// 	name: "Project",
	// },
};

/**
 * Navbar component.
 *
 * This component renders a navigation bar with links based on the current pathname.
 *
 * @returns {React.Element} The rendered navigation bar.
 */
const Navbar = () => {
	let pathname = usePathname() || "/";
	if (pathname.includes("/blog/")) {
		pathname = "/blog";
	}

	return (
		<nav>
			<ul className="flex items-center justify-center gap-4">
				{Object.entries(navItems).map(([path, { name }]) => {
					const isActive = pathname === path;
					return (
						<Link
							key={path}
							href={path}
							className={`text-sm duration-500 link relative overflow-hidden px-0 py-[7px] transition-all 
              ${
								isActive
									? "text-purple-500 stroke-purple-500/50"
									: "text-zinc-500 stroke-white/50"
							} hover:text-pink-500 hover:stroke-pink-500/50`}
						>
							{name}
							<svg
								className="link__graphic link__graphic--slide"
								width="300%"
								height="100%"
								viewBox="0 0 1200 60"
								preserveAspectRatio="none"
							>
								<title>wave</title>
								<path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0" />
							</svg>
						</Link>
					);
				})}
			</ul>
		</nav>
	);
};

export default Navbar;
