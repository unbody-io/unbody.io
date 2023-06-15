export const BlogPostAuthors = ({authors}: {authors: string[]}) => {
    return(
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
        }}>
            {
                authors.map((tag, index) => {
                    return (
                        <>
                            <span key={tag}>{tag}</span>
                            {index < authors.length - 1 ? <span key={tag + "comma"}>, </span> : null}
                        </>
                    )
                })
            }
        </div>
    )
}
