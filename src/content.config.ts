import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const PostsCollectionSchema = z.object({
    lang: z.enum(["en", "fr"]),
    wp_id: z.number().optional(),
    videoId: z.string().optional(),
    imgSrc: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
});

const posts = defineCollection({
    loader: glob({ base: "./src/posts", pattern: "**/*.md" }),
    schema: PostsCollectionSchema,
});

export const collections = {
    posts,
};
