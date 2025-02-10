// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import paraglide from "@inlang/paraglide-astro"

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()]
	},
    i18n: {
        locales: ["en", "fr"],
        defaultLocale: "en",
    },
    integrations: [
		paraglide({
			// recommended settings
			project: "./project.inlang",
			outdir: "./src/paraglide", //where your files should be
		}),
	],
});
