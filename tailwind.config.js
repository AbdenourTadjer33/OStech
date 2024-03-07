import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
	content: [
		"./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
		"./storage/framework/views/*.php",
		"./resources/views/**/*.blade.php",
		"./resources/js/**/*.jsx",
		"node_modules/flowbite-react/lib/esm/**/*.js",
	],

	theme: {
		colors: {
			primary: colors.blue,
			secondary: colors.gray,
			danger: colors.red,
			info: colors.indigo,
			slate: colors.slate,
			zinc: colors.zinc,
			cyan: colors.cyan,
			google: {
				"text-gray": "#3c4043",
				"button-blue": "#1a73e8",
				"button-blue-hover": "#5195ee",
				"button-dark": "#202124",
				"button-dark-hover": "#555658",
				"button-border-light": "#dadce0",
				"logo-blue": "#4285f4",
				"logo-green": "#34a853",
				"logo-yellow": "#fbbc05",
				"logo-red": "#ea4335",
			},
		},
		extend: {
			fontFamily: {
				sans: ["Figtree", ...defaultTheme.fontFamily.sans],
			},
		},
	},

	plugins: [
		forms,
		require("flowbite/plugin"),
		require("@tailwindcss/typography"),
	],

	darkMode: "class",
};
