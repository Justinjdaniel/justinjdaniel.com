"use client";

import { usePathname } from "next/navigation";
import React from "react";
import HoverWaveNavbar from "./hover-wave";

/**
 * Defines the navigation items array.
 */
const navItems = [
	{
		name: "Home",
		link: "/",
		// icon:
	},
	{
		name: "Blog",
		link: "/blog",
	},
	//  {
	// 	name: "Projects",
	// 	link: "/projects",
	// },
	// {
	// 	name: "About",
	// 	link: "/about",
	// },
];

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
			<HoverWaveNavbar navItems={navItems} />
		</nav>
	);
};

export default Navbar;
