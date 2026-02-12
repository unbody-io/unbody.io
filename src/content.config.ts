import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({
    pattern: "**/index.{md,mdx}",
    base: "./content/blog",
    generateId: ({ entry }) => entry.replace(/\/index\.(md|mdx)$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    publishDate: z.string(),
    author: z.string(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };
