import { defineConfig } from "astro/config";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";

export default defineConfig({
    vite: {
        plugins: [
            tailwindcss(),
            paraglideVitePlugin({
                project: "./project.inlang",
                outdir: "./src/paraglide",
            }),
        ],
    },
    output: "static",
    i18n: {
        locales: ["en", "fr"],
        defaultLocale: "en",
    },
    integrations: [pagefind()],
    image: {
        domains: ["i.ytimg.com"],
    },
    build: {
        format: "file",
    },
});
