import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { threeMinifier } from "@yushijinhun/three-minifier-rollup";

export default defineConfig({
	plugins: [
		tailwindcss(), sveltekit(),
		{ ...threeMinifier(), enforce: "pre" },
	]
});
