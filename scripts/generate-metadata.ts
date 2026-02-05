import { generateObject } from "ai"
import * as crypto from "node:crypto"
import * as fs from "node:fs/promises"
import * as path from "node:path"
import { z } from "zod"
import matter from "gray-matter"
import { openrouter, model } from "../src/config/llm"
import { siteConfig } from "../src/config/site"
import type { PostMetadata, Block } from "../src/types/data.types"

const CONTENT_DIR = path.join(import.meta.dirname, "../content/blog")
const DATA_DIR = path.join(import.meta.dirname, "../data")

// =============================================================================
// Block Splitting & Hashing
// =============================================================================

interface RawBlock {
  id: string
  index: number
  content: string
}

function generateBlockId(slug: string, index: number, content: string): string {
  const input = `${slug}:${index}:${content.slice(0, 100)}`
  return crypto.createHash("sha256").update(input).digest("hex").slice(0, 8)
}

function splitIntoBlocks(slug: string, content: string): RawBlock[] {
  const rawBlocks = content.split(/\n\n+/)

  return rawBlocks
    .map((text) => text.trim())
    .filter((text) => {
      if (text.length < 50) return false
      if (text.startsWith("http")) return false
      return true
    })
    .map((text, i) => {
      const index = i + 1
      const id = generateBlockId(slug, index, text)
      return { id, index, content: text }
    })
}

function formatChunksForPrompt(chunks: RawBlock[]): string {
  return chunks.map((b) => `[CHUNK ID: ${b.id}]\n${b.content}`).join("\n\n")
}

function calculateReadingTime(content: string): number {
  const words = content.split(/\s+/).length
  return Math.ceil(words / 200)
}

// =============================================================================
// Schema
// =============================================================================

const PostMetadataSchema = z.object({
  blurb: z.string().describe("1-2 sentence teaser that hooks the reader"),
  keywords: z.array(z.string()).describe("5-10 relevant keywords/phrases"),
  category: z.enum(["essay", "update", "case-study", "event", "explainer"]),
  relatedTopics: z.array(z.string()).describe("3-5 broader topics for cross-linking"),
  targetAudience: z.array(
    z.enum(["developers", "founders", "designers", "product-managers", "general"])
  ),
  tone: z.enum(["technical", "philosophical", "casual", "announcement"]),
  chunks: z.array(
    z.object({
      id: z.string().describe("Copy EXACT ID from chunk header"),
      summary: z.string().describe("One sentence using exact wording from chunk"),
    })
  ),
})

// =============================================================================
// Post Discovery
// =============================================================================

interface PostSource {
  slug: string
  contentPath: string
}

async function discoverPosts(): Promise<PostSource[]> {
  const entries = await fs.readdir(CONTENT_DIR, { withFileTypes: true })
  const posts: PostSource[] = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const indexPath = path.join(CONTENT_DIR, entry.name, "index.md")
    try {
      await fs.access(indexPath)
      posts.push({
        slug: entry.name,
        contentPath: indexPath,
      })
    } catch {
      console.warn(`Skipping ${entry.name}: no index.md found`)
    }
  }

  return posts
}

// =============================================================================
// Fallback Metadata
// =============================================================================

function createFallbackMetadata(
  slug: string,
  frontmatter: Record<string, unknown>,
  readingTime: number
): PostMetadata {
  return {
    slug,
    title: String(frontmatter.title ?? slug),
    publishDate: String(frontmatter.publishDate ?? new Date().toISOString()),
    author: String(frontmatter.author ?? "unknown"),
    thumbnail: frontmatter.thumbnail ? String(frontmatter.thumbnail) : null,
    blurb: "",
    keywords: [],
    category: "essay",
    summary: [],
    relatedTopics: [],
    targetAudience: ["general"],
    tone: "casual",
    readingTime,
  }
}

// =============================================================================
// Main
// =============================================================================

async function main() {
  const posts = await discoverPosts()
  console.log(`Found ${posts.length} posts to process\n`)

  if (!process.env.OPENROUTER_API_KEY) {
    const metadataPath = path.join(DATA_DIR, "posts-metadata.gen.json")
    try {
      await fs.access(metadataPath)
      console.log("⚠️ No OPENROUTER_API_KEY found. Skipping metadata update and using existing 'data/posts-metadata.gen.json'.")
      return
    } catch {
      console.log("⚠️ No OPENROUTER_API_KEY found. Generating fallback metadata...")
    }
  }

  const allBlocks: Block[] = []
  const allMetadata: PostMetadata[] = []

  for (const [i, post] of posts.entries()) {
    const raw = await fs.readFile(post.contentPath, "utf8")
    const { data: frontmatter, content } = matter(raw)

    // Skip drafts
    if (frontmatter.draft === true) {
      console.log(`[${i + 1}/${posts.length}] Skipping draft: ${post.slug}`)
      continue
    }

    const chunks = splitIntoBlocks(post.slug, content)
    const readingTime = calculateReadingTime(content)

    // Store blocks
    for (const chunk of chunks) {
      allBlocks.push({
        id: chunk.id,
        slug: post.slug,
        index: chunk.index,
        content: chunk.content,
      })
    }

    console.log(`[${i + 1}/${posts.length}] Processing ${post.slug} (${chunks.length} chunks)...`)

    if (!process.env.OPENROUTER_API_KEY) {
      console.log(`  ℹ️ Skipping AI generation (no API key). Using fallback.`)
      allMetadata.push(createFallbackMetadata(post.slug, frontmatter, readingTime))
      continue
    }

    try {
      const { object: generated } = await generateObject({
        model: openrouter(model),
        schema: PostMetadataSchema,
        prompt: `Extract metadata for this blog post from ${siteConfig.name}, ${siteConfig.description}

<frontmatter>
${JSON.stringify(frontmatter, null, 2)}
</frontmatter>

<chunks>
${formatChunksForPrompt(chunks)}
</chunks>

INSTRUCTIONS:
1. "blurb": Write a compelling 1-2 sentence teaser
2. "keywords": Extract 5-10 relevant keywords/phrases
3. "category": Choose ONE from: essay, update, case-study, event, explainer
4. "relatedTopics": List 3-5 broader topics this connects to
5. "targetAudience": Who would benefit from reading this
6. "tone": The overall tone of the content
7. "chunks": For EACH chunk, create { id, summary }
   - Copy chunk IDs EXACTLY from headers (8-char hex)
   - Write ONE sentence summary using wording from the chunk

IMPORTANT: Copy chunk IDs exactly. Do not make up IDs.`,
      })

      const metadata: PostMetadata = {
        slug: post.slug,
        title: String(frontmatter.title ?? post.slug),
        publishDate: String(frontmatter.publishDate ?? new Date().toISOString()),
        author: String(frontmatter.author ?? "unknown"),
        thumbnail: frontmatter.thumbnail ? String(frontmatter.thumbnail) : null,
        blurb: generated.blurb,
        keywords: generated.keywords,
        category: generated.category,
        summary: generated.chunks,
        relatedTopics: generated.relatedTopics,
        targetAudience: generated.targetAudience,
        tone: generated.tone,
        readingTime,
      }

      allMetadata.push(metadata)
      console.log(`  ✓ Done: ${metadata.title}`)
    } catch (error) {
      console.error(`  ✗ Error processing ${post.slug}:`, error)
      allMetadata.push(createFallbackMetadata(post.slug, frontmatter, readingTime))
    }
  }

  // Ensure data directory exists
  await fs.mkdir(DATA_DIR, { recursive: true })

  // Write outputs
  await fs.writeFile(
    path.join(DATA_DIR, "posts-metadata.gen.json"),
    JSON.stringify(allMetadata, null, 2)
  )
  await fs.writeFile(
    path.join(DATA_DIR, "blocks.gen.json"),
    JSON.stringify(allBlocks, null, 2)
  )

  console.log(`\nSaved ${allMetadata.length} posts to data/posts-metadata.gen.json`)
  console.log(`Saved ${allBlocks.length} blocks to data/blocks.gen.json`)
}

main().catch(console.error)
