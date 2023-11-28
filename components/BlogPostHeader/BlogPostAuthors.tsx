import Link from "next/link";

export type AuthorProps = {
    name: string
    link: string
    image?: string
}

export const BlogPostAuthor = (author: AuthorProps) => {
    return (
        <div style={{
            display: "flex",
            gap: "0.5rem",
        }}>
            <div style={{
                backgroundImage: `url(/images/authors/${author.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "1.5rem",
                height: "1.5rem",
                borderRadius: "50%",
            }}/>
            <Link href={author.link} target={"_blank"}>
                <span>{author.name}</span>
            </Link>
        </div>
    )
}

export const BlogPostAuthors = ({authors}: {authors: AuthorProps[]}) => {
    return(
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
        }}>
            {
                authors.map((author, index) => (
                    <BlogPostAuthor key={index} {...author}/>
                ))
            }
        </div>
    )
}
