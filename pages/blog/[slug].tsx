import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {getDatabasePropsValue, getPropValue} from "../../lib/utils.notion";
import {AppConfig, notionPageIds} from "../../lib/config";
import {getBlocks} from "../../lib/notion";
import {indexGenerator, rnrSlugify, Render} from "@9gustin/react-notion-render";
import {NotionBlock} from "@9gustin/react-notion-render/dist/types/NotionBlock";
import {BlogPostProps} from "../../lib/data.types";

import styles from "../../styles/BlogPost.module.scss"
import Tag from "../../components/Tag/Tag";
import {DateComponent} from "../../components/DateComponent";
import TwoColumnPage from "../../containers/TwoColumnPage/TwoColumnPage";
import {Meta} from "../../components/Meta";
import * as React from "react";

interface Props {
    content: NotionBlock[];
    page: BlogPostProps
}

const BlogPost: NextPage<Props> = (props) => {
    const {page, content} = props;
    return (
        <>
            <Meta title={`${page.title}`}
                  description={page.outline}
            />
            <TwoColumnPage withToc={false}
                           backLink={"/blog"}
                           backLinkText={"BLOG"}
                           className={styles.postContainer}
            >
                <div className={styles.firstLine}>
                    <DateComponent date={page.updated}/>
                    <span> — by </span><span className={styles.authors}>{page.author.map(a => <i
                    key={a.name}>{a.name}</i>)}</span>
                </div>
                <h1>{page.title}</h1>
                <strong className={"serif"}>{page.subtitle}</strong>
                <div className={styles.tags}>{page.tags.map(t => <Tag key={t.id}>{t.name}</Tag>)}</div>
                <hr/>
                <Render blocks={content} emptyBlocks/>
            </TwoColumnPage>
        </>
    )
}

export default BlogPost

export const getStaticProps: GetStaticProps = async (context) => {
    if (!context.params?.slug) {
        return {
            notFound: true
        }
    }

    const page = await getDatabasePropsValue(notionPageIds.BLOGPOSTS,
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
                property: "slug",
                formula: {
                    string: {
                        equals: context.params.slug
                    }
                }
            }
        })
    if (page.length === 0) return {notFound: true}

    const content = await getBlocks(page[0].id);

    return {
        props: {page: page[0], content}
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await getDatabasePropsValue(notionPageIds.BLOGPOSTS, {slug: null});

    return {
        paths: posts.filter(p => p.slug && p.slug.length > 0).map((p) => ({params: {slug: p.slug}})),
        fallback: false, // can also be true or 'blocking'
    }
}
