## Coptic Orthodox Answers (COA)

### What is this?

A rework of the website [copticorthodoxanswers.org](https://copticorthodoxanswers.org/), using the [Astro.build](https://astro.build/) framework. Astro's focus as a framework is fast content driven websites with awesome SEO. Exactly what's needed for COA.

### Most Wanted Features 🤌

-   [x] More cost effective solution (static site hosting is generally free)
-   [x] Locale supports for English and French strings, including post content (working currently via [Paraglide-Astro](https://inlang.com/m/iljlwzfs/paraglide-astro-i18n) and Astro's content collections)
    -   Example - `/post-type/:id` vs `/fr/post-type/:id`
-   [x] Dynamically pull the latest shorts on the shorts page as soon as they go live (working currently via Youtube's APIs in the googleapi package)
-   [ ] Searchable (will be adding [Pagefind](https://pagefind.app/docs/resources/#using-pagefind-with-a-specific-ssg))

### Exploring Ideas 🤔

-   [ ] Integration with WordPress APIs to pull the content from the original site which would allow editors to just keep using Wordpress CMS
-   [ ] Tag filtering
-   [ ] Archives page
