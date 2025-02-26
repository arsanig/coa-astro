import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import paraglide from "@inlang/paraglide-astro";
import pagefind from "astro-pagefind";

export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    i18n: {
        locales: ["en", "fr"],
        defaultLocale: "en",
    },
    integrations: [
        paraglide({
            project: "./project.inlang",
            outdir: "./src/paraglide",
        }),
        pagefind(),
    ],
    output: "static",
    build: {
        format: "file",
    },
});
