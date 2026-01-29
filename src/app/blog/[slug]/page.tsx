import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getAllSlugs, getPostBySlug, getPostContent } from "@/lib/blog"
import { getAuthor } from "@/config/authors"
import { BlogArticle } from "@/components/blog-article"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) return { title: "Post Not Found" }

  return {
    title: `${post.title} | Unbody Blog`,
    description: post.blurb,
    keywords: post.keywords,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const content = await getPostContent(slug)
  const author = getAuthor(post.author)

  const formattedDate = new Date(post.publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <main className="min-h-screen relative flex flex-col items-center selection:bg-foreground selection:text-background">
      <div className="relative z-10 w-full max-w-3xl pt-40 pb-48">
        <header className="mb-16">
          <div className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
            <time dateTime={post.publishDate}>{formattedDate}</time>
            <span className="opacity-30">|</span>
            <span>{post.readingTime} min read</span>
          </div>

          <h1 className="mb-6 text-2xl text-foreground leading-tight">
            {post.title}
          </h1>

          {author && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>By {author.name}</span>
              <span className="opacity-30">|</span>
              <span>{author.title}</span>
            </div>
          )}
        </header>

        <BlogArticle content={content} />

        <footer className="mt-20 pt-10 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {post.keywords.slice(0, 5).map((keyword) => (
              <span
                key={keyword}
                className="px-2 py-1 text-xs text-muted-foreground uppercase tracking-wider border border-border rounded"
              >
                {keyword}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </main>
  )
}
