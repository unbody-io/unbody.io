# Blog System with Generative Metadata

## Overview

A markdown-based blog system with LLM-powered metadata generation at build time. Markdown files serve as the source of truth, while an AI pipeline synthesizes rich metadata for each post and generates a site-wide knowledge base summary.

## Goals

- **Markdown-first**: Authors write content in markdown with minimal frontmatter
- **AI-enhanced**: LLM generates blurbs, keywords, categories, and paragraph summaries
- **Site-wide intelligence**: Auto-generated knowledge base describing the entire blog
- **Type-safe**: Generated JSON with TypeScript type definitions
- **Build-time**: All generation happens at build, no runtime LLM calls

---

## File Structure

```
unbody-website/
├── content/
│   └── blog/
│       └── {slug}/
│           ├── index.md        # Blog post content
│           ├── cover.jpg       # Co-located assets
│           └── diagram.png
├── config/
│   └── authors.ts              # Author metadata
├── data/
│   ├── types.ts                # TypeScript interfaces
│   ├── data.gen.posts.metadata.json
│   ├── data.gen.site.metadata.json
│   └── data.gen.blocks.json
├── scripts/
│   ├── generate-metadata.ts    # Main generation script
│   └── generate-site-summary.ts
└── .env.local                  # OPENROUTER_API_KEY
```

---

## Markdown Source

### Location

`content/blog/{slug}/index.md`

Each post lives in its own folder, allowing co-located assets (images, diagrams, etc.).

### Manual Frontmatter

Authors provide these fields manually:

```yaml
---
title: "The End of the Container Era"
publishDate: "2024-01-15"
author: "amir"
thumbnail: "./cover.jpg"  # Optional, relative to post folder
draft: false              # Optional, defaults to false
---

Content starts here...
```

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title |
| `publishDate` | Yes | ISO date string (YYYY-MM-DD) |
| `author` | Yes | Author ID (lowercase first name) |
| `thumbnail` | No | Path to cover image (relative to post folder) |
| `draft` | No | If `true`, excluded from generation |

---

## Author Configuration

### File: `config/authors.ts`

```typescript
export interface Author {
  id: string
  name: string
  title: string
  avatar: string
  twitter?: string
  github?: string
  linkedin?: string
}

export const authors: Author[] = [
  {
    id: "amir",
    name: "Amir Houieh",
    title: "Founder",
    avatar: "/images/authors/amir.jpg",
    twitter: "aaborning",
    github: "amir-houieh",
    linkedin: "amirhouieh"
  },
  {
    id: "gabor",
    name: "Gabor Cselle",
    title: "...",
    avatar: "/images/authors/gabor.jpg",
    // ...
  }
]

export function getAuthor(id: string): Author | undefined {
  return authors.find(a => a.id === id)
}
```

---

## Generated Output

### 1. Post Metadata: `data/data.gen.posts.metadata.json`

```typescript
interface PostMetadata {
  // From frontmatter (manual)
  slug: string
  title: string
  publishDate: string
  author: string
  thumbnail: string | null

  // LLM-generated
  blurb: string                    // 1-2 sentence teaser
  keywords: string[]               // 5-10 relevant keywords
  category: Category               // From predefined list
  summary: ChunkSummary[]          // Per-paragraph summaries
  relatedTopics: string[]          // Topics for cross-linking
  targetAudience: TargetAudience[] // Who this is for
  tone: Tone                       // Content tone

  // Calculated
  readingTime: number              // Minutes (word count / 200)
}

interface ChunkSummary {
  id: string      // 8-char SHA256 hash
  summary: string // One-sentence summary
}

type Category = "essay" | "update" | "case-study" | "event" | "explainer"

type TargetAudience = "developers" | "founders" | "designers" | "product-managers" | "general"

type Tone = "technical" | "philosophical" | "casual" | "announcement"
```

### 2. Site Metadata: `data/data.gen.site.metadata.json`

```typescript
interface SiteMetadata {
  summary: string                  // 2-3 paragraphs describing the blog
  keywords: string[]               // 15-20 key topics across all posts
  suggestiveQuestions: string[]    // 5-7 example questions the blog answers
  topicClusters: TopicCluster[]    // Grouped themes
  totalPosts: number
  lastUpdated: string              // ISO timestamp
}

interface TopicCluster {
  name: string        // e.g., "AI Philosophy"
  keywords: string[]  // Related keywords
  postSlugs: string[] // Posts in this cluster
}
```

### 3. Blocks: `data/data.gen.blocks.json`

```typescript
interface Block {
  id: string      // 8-char SHA256 hash
  slug: string    // Post slug
  index: number   // Position in post (1-based)
  content: string // Full paragraph text
}

type BlocksData = Block[]
```

### 4. Types: `data/types.ts`

Export all interfaces for type-safe imports:

```typescript
export interface PostMetadata { ... }
export interface SiteMetadata { ... }
export interface Block { ... }
export interface ChunkSummary { ... }
export interface TopicCluster { ... }
export type Category = ...
export type TargetAudience = ...
export type Tone = ...
```

---

## Categories

Functional categories based on content format/purpose:

| Category | Description | Examples |
|----------|-------------|----------|
| `essay` | Thought pieces, philosophical explorations | "The End of the Container Era", "AI is Complex" |
| `update` | Changelogs, weekly updates, releases | "Week 22: SDK, Talk, OSS" |
| `case-study` | Customer stories, project breakdowns | "Delightree AI Transformation" |
| `event` | Hack nights, meetups, workshops | "AI Hack Night" |
| `explainer` | Technical concepts, product features | "AI for Your Data", "Gen Data UI State" |

---

## LLM Configuration

### Provider Setup

```typescript
import { createOpenRouter } from "@openrouter/ai-sdk-provider"
import { generateText, Output } from "ai"
import { z } from "zod"

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
})

const model = "google/gemini-2.0-flash-001"
```

### Environment

`.env.local`:
```
OPENROUTER_API_KEY=sk-or-...
```

---

## Generation Scripts

### Location: `scripts/`

### Main Script: `scripts/generate-metadata.ts`

**Workflow:**

1. Discover all `content/blog/*/index.md` files
2. Filter out drafts (`draft: true`)
3. For each post:
   - Parse frontmatter with `gray-matter`
   - Split content into blocks (paragraphs)
   - Generate block IDs (8-char SHA256)
   - Call LLM for metadata extraction
   - Calculate reading time
4. Write `data/data.gen.posts.metadata.json`
5. Write `data/data.gen.blocks.json`

### Site Summary Script: `scripts/generate-site-summary.ts`

**Workflow:**

1. Read `data/data.gen.posts.metadata.json`
2. Aggregate all post metadata
3. Call LLM to generate site-wide summary
4. Write `data/data.gen.site.metadata.json`

### Execution Order

```bash
# Manual
npm run generate:metadata

# Or as part of build (package.json)
"scripts": {
  "generate:metadata": "bun run scripts/generate-metadata.ts && bun run scripts/generate-site-summary.ts",
  "prebuild": "npm run generate:metadata",
  "build": "next build"
}
```

---

## Chunk ID Generation

Deterministic 8-character SHA256 hash:

```typescript
import crypto from "node:crypto"

function generateChunkId(slug: string, index: number, content: string): string {
  const input = `${slug}:${index}:${content.slice(0, 100)}`
  return crypto.createHash("sha256").update(input).digest("hex").slice(0, 8)
}
```

---

## LLM Prompts

### Post Metadata Extraction

```typescript
const PostMetadataSchema = z.object({
  blurb: z.string().describe("1-2 sentence teaser that hooks the reader"),
  keywords: z.array(z.string()).describe("5-10 relevant keywords/phrases"),
  category: z.enum(["essay", "update", "case-study", "event", "explainer"]),
  relatedTopics: z.array(z.string()).describe("3-5 broader topics for cross-linking"),
  targetAudience: z.array(z.enum(["developers", "founders", "designers", "product-managers", "general"])),
  tone: z.enum(["technical", "philosophical", "casual", "announcement"]),
  chunks: z.array(z.object({
    id: z.string().describe("Copy EXACT ID from chunk header"),
    summary: z.string().describe("One sentence using exact wording from chunk")
  }))
})

const prompt = `
Extract metadata for this blog post from Unbody Lab, a company building adaptive thinking tools and exploring AI's role in augmenting human cognition.

<frontmatter>
${JSON.stringify(frontmatter)}
</frontmatter>

<chunks>
${chunks.map(c => `[CHUNK ID: ${c.id}]\n${c.content}`).join("\n\n")}
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

IMPORTANT: Copy chunk IDs exactly. Do not make up IDs.
`
```

### Site Summary Generation

```typescript
const SiteMetadataSchema = z.object({
  summary: z.string().describe("2-3 paragraphs describing what this blog covers"),
  keywords: z.array(z.string()).describe("15-20 key topics across all posts"),
  suggestiveQuestions: z.array(z.string()).describe("5-7 questions this blog can answer"),
  topicClusters: z.array(z.object({
    name: z.string(),
    keywords: z.array(z.string()),
    postSlugs: z.array(z.string())
  }))
})

const prompt = `
You are creating a structured summary of Unbody Lab's blog. Unbody Lab builds adaptive thinking tools and explores AI's role in augmenting human cognition.

<posts>
${posts.map(p => `- ${p.title} (${p.category}): ${p.blurb}`).join("\n")}
</posts>

Generate:
1. "summary": 2-3 paragraphs describing what this blog covers and who it's for
2. "keywords": 15-20 key topics/themes across all posts
3. "suggestiveQuestions": 5-7 example questions readers might have that this blog answers
4. "topicClusters": Group posts into 3-5 thematic clusters with names, keywords, and post slugs
`
```

---

## Error Handling

If LLM generation fails for a post:

1. Log warning with post slug and error
2. Generate fallback metadata from frontmatter only:
   ```typescript
   {
     slug,
     title,
     publishDate,
     author,
     thumbnail,
     blurb: "",           // Empty
     keywords: [],        // Empty
     category: "essay",   // Default
     summary: [],         // Empty
     relatedTopics: [],   // Empty
     targetAudience: ["general"],
     tone: "casual",
     readingTime          // Still calculated
   }
   ```
3. Continue processing other posts
4. Build succeeds with partial data

---

## Build Integration

### package.json

```json
{
  "scripts": {
    "generate:metadata": "bun run scripts/generate-metadata.ts && bun run scripts/generate-site-summary.ts",
    "prebuild": "npm run generate:metadata",
    "build": "next build",
    "dev": "next dev"
  }
}
```

### Regeneration

Full regeneration on every build. No caching or incremental updates.

---

## Dependencies

```json
{
  "dependencies": {
    "gray-matter": "^4.0.3",
    "react-markdown": "^10.1.0"
  },
  "devDependencies": {
    "@openrouter/ai-sdk-provider": "^0.x",
    "ai": "^4.x",
    "zod": "^3.x"
  }
}
```

---

## Usage in Next.js

### Importing Generated Data

```typescript
import postsMetadata from "@/data/data.gen.posts.metadata.json"
import siteMetadata from "@/data/data.gen.site.metadata.json"
import blocks from "@/data/data.gen.blocks.json"
import type { PostMetadata, SiteMetadata, Block } from "@/data/types"

// Type assertion if needed
const posts = postsMetadata as PostMetadata[]
```

### Blog Listing Page

```typescript
// app/blog/page.tsx
import postsMetadata from "@/data/data.gen.posts.metadata.json"

export default function BlogPage() {
  const posts = postsMetadata.filter(p => !p.draft)

  return (
    <div>
      {posts.map(post => (
        <BlogCard
          key={post.slug}
          title={post.title}
          blurb={post.blurb}
          category={post.category}
          readingTime={post.readingTime}
        />
      ))}
    </div>
  )
}
```

### Individual Post Page

```typescript
// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation"
import postsMetadata from "@/data/data.gen.posts.metadata.json"
import { getPostContent } from "@/lib/blog"

export async function generateStaticParams() {
  return postsMetadata.map(post => ({ slug: post.slug }))
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const meta = postsMetadata.find(p => p.slug === slug)
  if (!meta) notFound()

  const content = await getPostContent(slug) // Read markdown file

  return <Article meta={meta} content={content} />
}
```

---

## Future Considerations

- **Search**: Use blocks.json for full-text search or RAG
- **Related Posts**: Use keywords/relatedTopics for automatic suggestions
- **RSS Feed**: Generate from posts metadata
- **Sitemap**: Include all published posts
- **Analytics**: Track which categories/topics perform best
