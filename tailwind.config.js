// const defaultTheme = require("tailwindcss/defaultTheme");
import typography from "@tailwindcss/typography";
import addVariablesForColors from "./lib/utils/add-variables-for-colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./content/**/*.mdx",
	],
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						"code::before": {
							content: '""',
						},
						"code::after": {
							content: '""',
						},
					},
				},
				quoteless: {
					css: {
						"blockquote p:first-of-type::before": { content: "none" },
						"blockquote p:first-of-type::after": { content: "none" },
					},
				},
			},
			fontFamily: {
				// sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
				// display: ["var(--font-calsans)"],
			},
			backgroundImage: {
				"gradient-radial":
					"radial-gradient(50% 50% at 50% 50%, var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			keyframes: {
				"in-and-out": {
					"entry 0%": { opacity: 0, transform: "translateY(20%)" },
					"entry 100%": { opacity: 1, transform: " translateY(0)" },
					"exit 0%": { opacity: 1, transform: "translateY(0)" },
					"exit 100%": { opacity: 0, transform: "translateY(-20%)" },
				},
				"fade-in": {
					"0%": { opacity: "0%" },
					"75%": { opacity: "0%" },
					"100%": { opacity: "100%" },
				},
				"fade-out": {
					"0%": { opacity: "100%" },
					"75%": { opacity: "100%" },
					"100%": { opacity: "0%" },
				},
				"fade-left": {
					"0%": { transform: "translateX(100%)", opacity: "0%" },
					"30%": { transform: "translateX(0%)", opacity: "100%" },
					"100%": { opacity: "0%" },
				},
				"fade-right": {
					"0%": { transform: "translateX(-100%)", opacity: "0%" },
					"30%": { transform: "translateX(0%)", opacity: "100%" },
					"100%": { opacity: "0%" },
				},
				"fade-in-up": {
					from: { transform: "translateY(40%)", opacity: "0%" },
					to: { transform: "translateY(0%)", opacity: "100%" },
				},
				"fade-out-up": {
					from: { transform: "translateY(0%)", opacity: "100%" },
					to: { transform: "translateY(-40%)", opacity: "0%" },
				},
				"fade-in-title": {
					"0%": {
						"line-height": "0%",
						"letter-spacing": "0.25em",
						opacity: "0",
					},
					"25%": { "line-height": "0%", opacity: "0%" },
					"80%": { opacity: "100%" },
					"100%": { "line-height": "100%", opacity: "100%" },
				},
				disappear: { from: { display: "flex" }, to: { display: "none" } },
				appear: {
					"0%, 99%": { display: "none", opacity: 0 },
					"100%": { display: "flex", opacity: 1 },
				},
				wiggle: {
					"0%, 100%": { transform: "rotate(-3deg)" },
					"50%": { transform: "rotate(3deg)" },
				},
			},
			animation: {
				"in-and-out": "in-and-out linear forwards",
				"fade-in": "fade-in 3s ease-in-out forwards",
				"fade-out": "fade-out 3s ease-in-out forwards",
				"fade-left": "fade-left 3s ease-in-out forwards",
				"fade-right": "fade-right 3s ease-in-out forwards",
				"fade-in-up": "fade-in-up linear forwards",
				"fade-out-up": "fade-out-up linear forwards",
				"fade-in-title": "fade-in-title 3s ease-out forwards",
				disappear: "disappear 1.5s ease-out forwards",
				appear: "appear 1.5s ease-out forwards",
				wiggle: "wiggle 1s ease-in-out infinite",
			},
			support: {},
		},
	},
	plugins: [
		typography,
		require("@tailwindcss/typography"),
		addVariablesForColors,
		// require("tailwindcss-debug-screens"),
	],
};
