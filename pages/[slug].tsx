import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {getDatabasePropsValue} from "../lib/utils.notion";
import {AppConfig, notionPageIds} from "../lib/config";
import {getBlocks} from "../lib/notion";
import {SinglePageProps} from "../lib/data.types";
import {NotionBlock} from "@9gustin/react-notion-render/dist/types/NotionBlock";
import {indexGenerator, Render, rnrSlugify} from "@9gustin/react-notion-render";
import styles from "../styles/SinglePage.module.scss";
import Link from "next/link";
import TwoColumnPage from "../containers/TwoColumnPage/TwoColumnPage";
import {Meta} from "../components/Meta";

interface Props {
    page: SinglePageProps;
    content: NotionBlock[]
}

const SinglePage: NextPage<Props> = ({page, content}) => {
    return (
        <>
            <Meta title={`${page.display_title} - ${AppConfig.site_name}`}
                  description={page.outline}
            />
            <TwoColumnPage backLink={"/"}
                           withToc={true}
                           backLinkText={"HOME"}
                           className={styles.pageContainer}
                           leftPanelContent={
                               <ul className={styles.toc}>
                                   {
                                       indexGenerator(content)
                                           .map(({id, plainText, type}) => (
                                               <li key={id} className={styles[`${type}`]}>
                                                   <Link href={`#${rnrSlugify(plainText)}`}>
                                                       <span>{plainText}</span>
                                                   </Link>
                                               </li>
                                           ))
                                   }
                               </ul>
                           }
            >
                <h1>{page.display_title}</h1>
                <strong className={`serif`}>{page.subtitle}</strong>
                <br/><br/>
                <Render blocks={content} emptyBlocks/>
            </TwoColumnPage>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    if (!context.params?.slug) {
        return {
            notFound: true
        }
    }
    const page = await getDatabasePropsValue(notionPageIds.SINGLEPAGES,
        {
            title: null,
            outline: null,
            published: null,
            slug: null,
            display_title: null,
            subtitle: null
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
    const pages = await getDatabasePropsValue(notionPageIds.SINGLEPAGES, {slug: null});

    return {
        paths: pages.filter(p => p.slug && p.slug.length > 0).map((p) => ({params: {slug: p.slug}})),
        fallback: false,
    }
}

export default SinglePage
