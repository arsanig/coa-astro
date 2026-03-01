import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import paraglide from "@inlang/paraglide-astro";
import pagefind from "astro-pagefind";

import favicons from "astro-favicons";

export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    i18n: {
        locales: ["en", "fr"],
        defaultLocale: "en",
    },
    integrations: [paraglide({
        project: "./project.inlang",
        outdir: "./src/paraglide",
    }), pagefind(), favicons({
        name: "Coptic Orthodox Answers",
        short_name: "COA",
        background: "#171717",
        theme_color: "#171717",
    })],
    image: {
        domains: ["i.ytimg.com"],
    },
    output: "static",
    build: {
        format: "file",
    },
});