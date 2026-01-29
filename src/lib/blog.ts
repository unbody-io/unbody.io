import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import type { PostMetadata } from "@/types/data.types"
import postsMetadata from "../../data/posts-metadata.gen.json"

const CONTENT_DIR = path.join(process.cwd(), "content/blog")

export function getAllPosts(): PostMetadata[] {
  return [...(postsMetadata as PostMetadata[])].sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  )
}

export function getPostBySlug(slug: string): PostMetadata | undefined {
  return (postsMetadata as PostMetadata[]).find((post) => post.slug === slug)
}

export function getAllSlugs(): string[] {
  return (postsMetadata as PostMetadata[]).map((post) => post.slug)
}

export async function getPostContent(slug: string): Promise<string> {
  const filePath = path.join(CONTENT_DIR, slug, "index.md")
  const fileContent = await fs.readFile(filePath, "utf-8")
  const { content } = matter(fileContent)
  return content
}
