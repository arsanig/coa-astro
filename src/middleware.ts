import { defineMiddleware } from "astro:middleware";
import { overwriteGetLocale } from "./paraglide/runtime.js";

export const onRequest = defineMiddleware((context, next) => {
    const locale = context.url.pathname.startsWith("/fr") ? "fr" : "en";
    overwriteGetLocale(() => locale);
    return next();
});
