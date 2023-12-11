import Link from "next/link";
import {useRouter} from "next/router";
import {getPagesUnderRoute} from "nextra/context";
import Button from "../../components/Button/Button";
import Tag from "../../components/Tag/Tag";
import {Page} from "nextra";
import React from "react";
import {BlogPostHeader} from "../../components/BlogPostHeader/BlogPostHeader";
import styles from "./styles.module.css";

type TPage = Page & {
    route: string;
    meta: {
        title: string;
    }
    frontMatter: {
        title: string;
        outline: string;
        date: string;
        category: string;
        authors: {name: string, link: string}[];
        seo_tags: string;
        image: string;
    }
}
export default function BlogIndex() {
    const pages = getPagesUnderRoute("/blog");

    console.log(pages);

    return (
        <div className={styles.grid}>
            {
                pages
                    .sort((a: TPage, b: TPage) => {
                        const aDate = new Date(a.frontMatter.date);
                        const bDate = new Date(b.frontMatter.date);
                        return bDate.getTime() - aDate.getTime() ;
                    })
                    .map((page: TPage) => {
                        return (
                            <div className={styles.gridItem}>
                                <BlogPostHeader title={page.frontMatter.title}
                                                authors={page.frontMatter.authors}
                                                outline={page.frontMatter.outline}
                                                date={page.frontMatter.date}
                                                type={"card"}
                                                image={page.frontMatter.image}
                                />
                                <br/>
                                <div>
                                    <Button size={"small"}>
                                        <Link href={page.route}>
                                            Read the blog post →
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        );
                    })
            }
        </div>
    )
}
