import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {getDatabasePropsValue, getPropValue} from "../../lib/utils.notion";
import {AppConfig, notionPageIds} from "../../lib/config";
import {getBlocks} from "../../lib/notion";
import {Render} from "@9gustin/react-notion-render";
import {NotionBlock} from "@9gustin/react-notion-render/dist/types/NotionBlock";
import {FeatureProp} from "../../lib/data.types";

import styles from "../../styles/FeaturePage.module.scss"
import TwoColumnPage from "../../containers/TwoColumnPage/TwoColumnPage";
import * as React from "react";
import {Meta} from "../../components/Meta";
import NotionVideo from "../../components/NotionVideo/NotionVideo";

interface Props {
    content: NotionBlock[];
    page: FeatureProp
}

const FeaturePage: NextPage<Props> = (props) => {
    const {page, content} = props;
    return (
        <>
            <Meta title={`${page.title}`}
                  description={page.outline}
            />
            <TwoColumnPage withToc={false}
                           backLink={"/"}
                           backLinkText={"HOME"}
                           className={styles.container}
            >
                <h1 className={styles.title}>{page.title}</h1>
                <NotionVideo video={page.video}/>
                <Render blocks={content} emptyBlocks/>
            </TwoColumnPage>
        </>
    )
}

export default FeaturePage

export const getStaticProps: GetStaticProps = async (context) => {
    if (!context.params?.slug) {
        return {
            notFound: true
        }
    }
    const page = await getDatabasePropsValue(notionPageIds.FEATURES,
        {
            title: null,
            outline: null,
            slug: null,
            benefits: null,
            video: null
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
    const posts = await getDatabasePropsValue(notionPageIds.FEATURES, {slug: null});
    return {
        paths: posts.filter(p => p.slug && p.slug.length > 0).map((p) => ({params: {slug: p.slug}})),
        fallback: false, // can also be true or 'blocking'
    }
}
