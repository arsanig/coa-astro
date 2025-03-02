import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const PostsCollectionSchema = z.object({
    lang: z.enum(["en", "fr"]),
    wp_id: z.number().optional(),
    imgId: z.number().optional(),
    imgSrc: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()).optional(),
});

const posts = defineCollection({
    loader: glob({ base: "./src/posts", pattern: "**/*.md" }),
    schema: PostsCollectionSchema,
});

const apostolic_answers = defineCollection({
    loader: glob({
        base: "./src/posts/apostolic-answers",
        pattern: "*.md",
    }),
    schema: PostsCollectionSchema,
});

const apostolic_answers_fr = defineCollection({
    loader: glob({
        base: "./src/posts/fr/apostolic-answers",
        pattern: "*.md",
    }),
    schema: PostsCollectionSchema,
});

const deep_dive = defineCollection({
    loader: glob({
        base: "./src/posts/deep-dive",
        pattern: "*.md",
    }),
    schema: PostsCollectionSchema,
});

const deep_dive_fr = defineCollection({
    loader: glob({
        base: "./src/posts/fr/deep-dive",
        pattern: "*.md",
    }),
    schema: PostsCollectionSchema,
});

const podcasts = defineCollection({
    loader: glob({
        base: "./src/posts/podcasts",
        pattern: "*.md",
    }),
    schema: PostsCollectionSchema,
});

const podcasts_fr = defineCollection({
    loader: glob({
        base: "./src/posts/fr/podcasts",
        pattern: "*.md",
    }),
    schema: PostsCollectionSchema,
});

export const collections = {
    posts,
    apostolic_answers,
    apostolic_answers_fr,
    deep_dive,
    deep_dive_fr,
    podcasts,
    podcasts_fr,
};
