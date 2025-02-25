/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
    interface Locals {
        paraglide: {
            lang: string;
            dir: "ltr" | "rtl";
        };
    }
}

interface ImportMetaEnv {
    readonly YOUTUBE_API_KEY: string;
    readonly COA_CHANNEL_ID: string;
    readonly COA_SHORTS_PLAYLIST_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
