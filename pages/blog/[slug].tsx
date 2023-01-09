import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {getDatabasePropsValue, getPropValue} from "../../lib/utils.notion";
import {notionPageIds} from "../../lib/config";
import {getBlocks} from "../../lib/notion";
import {indexGenerator, rnrSlugify, Render} from "@9gustin/react-notion-render";
import {NotionBlock} from "@9gustin/react-notion-render/dist/types/NotionBlock";
import {BlogPostProps} from "../../lib/data.types";

import styles from "../../styles/BlogPost.module.scss"
import Tag from "../../components/Tag/Tag";
import {DateComponent} from "../../components/DateComponent";
import Link from "next/link";
import {ArrowLeft} from "../../components/Arrow";

interface Props {
    content: NotionBlock[];
    page: BlogPostProps
}

const BlogPost: NextPage<Props> = (props) => {
    const {page, content} = props;
    return (
        <div className={`${styles.postContainer} contentContainer grid`}>
            <div className={`col-4 ${styles.leftPanel}`}>
                <Link className={styles.back} href={"/blog"}>
                    <ArrowLeft/><span>Blog</span>
                </Link>
                {/*<ul className={styles.toc}>*/}
                {/*    {*/}
                {/*        indexGenerator(content).map(({ id, plainText, type }) => (*/}
                {/*            <li key={id} className={styles[`l_${type.split("_").pop()}`]}>*/}
                {/*                <Link href={`#${rnrSlugify(plainText)}`}>*/}
                {/*                    <span>{plainText}</span>*/}
                {/*                </Link>*/}
                {/*            </li>*/}
                {/*        ))*/}
                {/*    }*/}
                {/*</ul>*/}
            </div>
            <article className={`${styles.post} col-8`}>
                <div className={styles.firsline}>
                    <DateComponent date={page.updated}/>
                    <span> — by </span><span className={styles.authors}>{page.author.map(a => <i key={a.name}>{a.name}</i>)}</span>
                </div>
                <h1>{page.title}</h1>
                <strong className={"serif"}>{page.subtitle}</strong>
                <div className={styles.tags}>{page.tags.map(t => <Tag key={t.id}>{t.name}</Tag>)}</div>
                <hr/>
                <Render blocks={content} emptyBlocks/>
            </article>
        </div>
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
    const posts = await getDatabasePropsValue(notionPageIds.BLOGPOSTS, {slug: null, id: null});

    return {
        paths: posts.filter(p => p.slug && p.slug.length > 0).map((p) => ({params: {slug: p.slug}})),
        fallback: false, // can also be true or 'blocking'
    }
}
