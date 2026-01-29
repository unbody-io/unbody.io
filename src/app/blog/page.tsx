import { getAllPosts } from "@/lib/blog"
import { BlogCard } from "@/components/blog-card"

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen relative flex flex-col items-center selection:bg-foreground selection:text-background">
      <div className="relative z-10 w-full max-w-3xl pt-40 pb-48">
        <header className="mb-16">
          <h1 className="mb-4 text-foreground uppercase tracking-wider">Blog</h1>
          <p className="leading-relaxed text-muted-foreground">
            Essays, updates, and explorations from the Unbody team.
          </p>
        </header>

        <div className="space-y-12">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </main>
  )
}
