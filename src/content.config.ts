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

const projects = defineCollection({
  loader: glob({
    pattern: "**/index.{md,mdx}",
    base: "./content/projects",
    generateId: ({ entry }) => entry.replace(/\/index\.(md|mdx)$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    blurb: z.string(),
    status: z.enum(["experimental", "alpha", "active", "archived"]),
    date: z.string(),
    tags: z.array(z.string()).optional().default([]),
    github: z.string().optional(),
    website: z.string().optional(),
    cover: z.string().optional(),
    heroVideo: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({
    pattern: "**/index.{md,mdx}",
    base: "./content/pages",
    generateId: ({ entry }) => entry.replace(/\/index\.(md|mdx)$/, ""),
  }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { blog, projects, pages };
