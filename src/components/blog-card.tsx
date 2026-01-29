import Link from "next/link"
import type { PostMetadata } from "@/types/data.types"

interface BlogCardProps {
  post: PostMetadata
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="mb-3 flex items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={post.publishDate}>{formattedDate}</time>
          <span className="opacity-30">|</span>
          <span>{post.readingTime} min read</span>
          <span className="opacity-30">|</span>
          <span className="uppercase tracking-wider text-xs">{post.category}</span>
        </div>

        <h2 className="mb-3 text-foreground text-lg group-hover:text-accent transition-colors duration-300">
          {post.title}
        </h2>

        <p className="leading-relaxed text-muted-foreground">{post.blurb}</p>
      </Link>
    </article>
  )
}
