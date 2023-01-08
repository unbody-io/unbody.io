import {GetStaticProps, NextPage} from "next";
import {getDatabasePropsValue} from "../../lib/utils.notion";
import {notionPageIds} from "../../lib/config";
import {BlogPostProps} from "../../lib/data.types";
import {groupBy} from "../../lib/utils";
import InfoSection from "../../containers/InfoSection/InfoSection";
import Link from "next/link";
import {ArrowRight} from "../../components/Arrow";

import styles from "../../styles/Blog.module.scss"
import Button from "../../components/Button/Button";

interface Props {
    posts: BlogPostProps[]
}

export const Blog: NextPage<Props> = (props) => {
    const groups = groupBy<BlogPostProps>(props.posts, (p) => p.audience.name);
    return (
        <div className={styles.blog}>
            {
                Object.entries(groups).map(([audience, posts]) => (
                    <InfoSection label={`For ${audience}`}
                                 key={audience}
                    >
                        {
                            posts.map(p => (
                                <div key={p.id} className={styles.post}>
                                    <div>
                                        <small className={styles.date}>22 June 2023</small>
                                        {/*-*/}
                                        {/*<small>by</small>*/}
                                        {/*<>*/}
                                        {/*    {*/}
                                        {/*        p.author.map((a) => <i key={`${p.id}-${a.name}`}>{a.name}</i>)*/}
                                        {/*    }*/}
                                        {/*</>*/}
                                    </div>
                                    <Link href={`/blog/${p.slug}`} className={styles.title}>
                                        <h2>{p.title}</h2>
                                    </Link>
                                    <h3 className={styles.subtitle}>{p.subtitle}</h3>
                                    <p className={styles.outline} dangerouslySetInnerHTML={{__html: p.outline}}/>
                                    <Button>
                                        <Link href={`/blog/${p.slug}`}>
                                            READ MORE <ArrowRight/>
                                        </Link>
                                    </Button>

                                </div>
                            ))
                        }
                    </InfoSection>
                ))
            }
        </div>
    )
}

export default Blog

export const getStaticProps: GetStaticProps = async (context) => {
    const posts = await getDatabasePropsValue(notionPageIds.BLOGPOSTS,
        {
            title: null,
            outline: null,
            subtitle: null,
            tags: null,
            author: null,
            published: null,
            slug: null,
            seotags: null,
            audience: null
        },
        {
            filter: {
                property: "published",
                checkbox: {
                    equals: true
                }
            }
        })

    return {
        props: {
            posts
        },
        revalidate: 10
    }
}
