import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({
    pattern: "**/index.md",
    base: "./content/blog",
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    publishDate: z.string(),
    author: z.string(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };
