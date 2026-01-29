import ReactMarkdown from "react-markdown"
import { cn } from "@/lib/utils"

interface BlogArticleProps {
  content: string
  className?: string
}

export function BlogArticle({ content, className }: BlogArticleProps) {
  return (
    <article className={cn(className)}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="mt-16 mb-4 text-foreground uppercase tracking-wider">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-16 mb-4 text-foreground uppercase tracking-wider">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-12 mb-4 text-foreground uppercase tracking-wider text-sm">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-8 leading-relaxed text-muted-foreground">
              {children}
            </p>
          ),
          em: ({ children }) => (
            <em className="text-foreground not-italic">{children}</em>
          ),
          strong: ({ children }) => (
            <strong className="text-foreground font-medium">{children}</strong>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-accent underline underline-offset-4 hover:text-foreground transition-colors duration-300"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="mb-8 space-y-2 text-muted-foreground">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-8 space-y-2 text-muted-foreground list-decimal list-inside">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent">
              {children}
            </li>
          ),
          code: ({ children, className }) => {
            const isInline = !className
            if (isInline) {
              return (
                <code className="px-1.5 py-0.5 bg-muted text-foreground rounded text-sm">
                  {children}
                </code>
              )
            }
            return <code className={className}>{children}</code>
          },
          pre: ({ children }) => (
            <pre className="mb-8 p-6 bg-muted rounded-lg overflow-x-auto text-sm">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mb-8 pl-6 border-l-2 border-accent text-foreground italic">
              {children}
            </blockquote>
          ),
          hr: () => (
            <hr className="my-16 border-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
