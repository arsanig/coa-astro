import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const library = defineCollection({
    loader: glob({ base: "./src/posts", pattern: "**/*.md" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        // Transform string to Date object
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        tags: z.array(z.string()).optional(),
    }),
});
const apostolic_answers = defineCollection({
    loader: glob({ base: "./src/posts/apostolic-answers", pattern: "*.md" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        // Transform string to Date object
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        tags: z.array(z.string()).optional(),
    }),
});
const deep_dive = defineCollection({
    loader: glob({ base: "./src/posts/deep-dive", pattern: "*.md" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        // Transform string to Date object
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        tags: z.array(z.string()).optional(),
    }),
});
const pod = defineCollection({
    loader: glob({ base: "./src/posts/podcasts", pattern: "*.md" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        // Transform string to Date object
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        tags: z.array(z.string()).optional(),
    }),
});

export const collections = { library, apostolic_answers, deep_dive, pod };
