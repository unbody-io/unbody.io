import { generateText, Output } from "ai"
import * as fs from "node:fs/promises"
import * as path from "node:path"
import { z } from "zod"
import { openrouter, model } from "../src/config/llm"
import { siteConfig } from "../src/config/site"
import type { PostMetadata, SiteMetadata } from "../src/types/data.types"

const DATA_DIR = path.join(import.meta.dirname, "../data")

// =============================================================================
// Schema
// =============================================================================

const SiteMetadataSchema = z.object({
  summary: z.string().describe("2-3 paragraphs describing what this blog covers"),
  keywords: z.array(z.string()).describe("15-20 key topics across all posts"),
  suggestiveQuestions: z
    .array(z.string())
    .describe("5-7 questions this blog can answer"),
  topicClusters: z.array(
    z.object({
      name: z.string(),
      keywords: z.array(z.string()),
      postSlugs: z.array(z.string()),
    })
  ),
})

// =============================================================================
// Main
// =============================================================================

async function main() {
  const postsPath = path.join(DATA_DIR, "posts-metadata.gen.json")
  const raw = await fs.readFile(postsPath, "utf8")
  const posts: PostMetadata[] = JSON.parse(raw)

  console.log(`Generating site summary from ${posts.length} posts...\n`)

  if (!process.env.OPENROUTER_API_KEY) {
    console.warn("⚠️ No OPENROUTER_API_KEY found. Skipping AI generation.")
    
    const siteMetadataPath = path.join(DATA_DIR, "site-metadata.gen.json")
    try {
      await fs.access(siteMetadataPath)
      console.log("Using existing site-metadata.gen.json")
    } catch {
      const dummy: SiteMetadata = {
        summary: "Site summary not generated (missing API key).",
        keywords: [],
        suggestiveQuestions: [],
        topicClusters: [],
        totalPosts: posts.length,
        lastUpdated: new Date().toISOString(),
      }
      await fs.writeFile(siteMetadataPath, JSON.stringify(dummy, null, 2))
      console.log("Created placeholder site-metadata.gen.json")
    }
    return
  }

  const { output: generated } = await generateText({
    model: openrouter(model),
    output: Output.object({ schema: SiteMetadataSchema }),
    prompt: `You are creating a structured summary of ${siteConfig.name}'s blog. ${siteConfig.description}

<posts>
${posts.map((p) => `- ${p.title} [${p.slug}] (${p.category}): ${p.blurb}`).join("\n")}
</posts>

Generate:
1. "summary": 2-3 paragraphs describing what this blog covers and who it's for
2. "keywords": 15-20 key topics/themes across all posts
3. "suggestiveQuestions": 5-7 example questions readers might have that this blog answers
4. "topicClusters": Group posts into 3-5 thematic clusters with names, keywords, and post slugs`,
  })

  const siteMetadata: SiteMetadata = {
    ...generated,
    totalPosts: posts.length,
    lastUpdated: new Date().toISOString(),
  }

  await fs.writeFile(
    path.join(DATA_DIR, "site-metadata.gen.json"),
    JSON.stringify(siteMetadata, null, 2)
  )

  console.log("✓ Saved site metadata to data/site-metadata.gen.json")
}

main().catch(console.error)
