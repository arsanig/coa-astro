import type { AvailableLanguageTag } from "../paraglide/runtime.js";

type AbsolutePathname = `/${string}`;

const pathnames: Record<
    AbsolutePathname,
    Record<AvailableLanguageTag, AbsolutePathname>
> = {
    "/": {
        en: "/",
        fr: "/fr",
    },
    "/library": {
        en: "/library",
        fr: "/fr/library",
    },
    "/apostolic-answers": {
        en: "/apostolic-answers",
        fr: "/fr/apostolic-answers",
    },
    "/deep-dive": {
        en: "/deep-dive",
        fr: "/fr/deep-dive",
    },
    "/podcasts": {
        en: "/podcasts",
        fr: "/fr/podcasts",
    },
    "/shorts": {
        en: "/shorts",
        fr: "/fr/shorts",
    },
    "/faith": {
        en: "/faith",
        fr: "/fr/faith",
    },
    "/contact": {
        en: "/contact",
        fr: "/fr/contact",
    },
};

export function localizePathname(
    pathname: AbsolutePathname,
    locale: AvailableLanguageTag
) {
    if (pathnames[pathname]) {
        return pathnames[pathname][locale];
    }
    return pathname;
}
