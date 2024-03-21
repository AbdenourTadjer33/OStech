import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
	resolve: {
		alias: {
			"ziggy-js": path.resolve("vendor/tightenco/ziggy"),
		},
	},
	plugins: [
		laravel({
			input: "resources/js/app.jsx",
            ssr: "resources/js/ssr.js",
			refresh: true,
		}),
		react(),
	],
});
