import Tag from "./Tag/Tag";

export const BlogPostTags = ({tags}: {tags: string[]}) => {
    return(
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
        }}>
            {
                tags.map((tag) => {
                    return <Tag key={tag}>{tag}</Tag>
                })
            }
        </div>
    )
}
