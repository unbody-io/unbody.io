export type Category = "essay" | "update" | "case-study" | "event" | "explainer"

export type TargetAudience =
  | "developers"
  | "founders"
  | "designers"
  | "product-managers"
  | "general"

export type Tone = "technical" | "philosophical" | "casual" | "announcement"

export interface ChunkSummary {
  id: string
  summary: string
}

export interface PostMetadata {
  // From frontmatter (manual)
  slug: string
  title: string
  publishDate: string
  author: string
  thumbnail: string | null

  // LLM-generated
  blurb: string
  keywords: string[]
  category: Category
  summary: ChunkSummary[]
  relatedTopics: string[]
  targetAudience: TargetAudience[]
  tone: Tone

  // Calculated
  readingTime: number
}

export interface Block {
  id: string
  slug: string
  index: number
  content: string
}

export interface TopicCluster {
  name: string
  keywords: string[]
  postSlugs: string[]
}

export interface SiteMetadata {
  summary: string
  keywords: string[]
  suggestiveQuestions: string[]
  topicClusters: TopicCluster[]
  totalPosts: number
  lastUpdated: string
}
