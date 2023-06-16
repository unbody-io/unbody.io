import Link from "next/link";
import {useRouter} from "next/router";
import {getPagesUnderRoute} from "nextra/context";
import Button from "../../components/Button/Button";
import Tag from "../../components/Tag/Tag";
import {Page} from "nextra";
import {BlogPostAuthors} from "../../components/BlogPostHeader/BlogPostAuthors";
import React from "react";
import {BlogPostHeader} from "../../components/BlogPostHeader/BlogPostHeader";

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
    }
}
export default function BlogIndex() {
    const pages = getPagesUnderRoute("/blog");

    return pages.map((page: TPage) => {
        return (
            <div>
                <BlogPostHeader title={page.frontMatter.title}
                                authors={page.frontMatter.authors}
                                outline={page.frontMatter.outline}
                                date={page.frontMatter.date}
                                type={"card"}
                />
                <br/>
                <div>
                    <Button size={"small"}>
                        <Link href={page.route}>
                            Read the blog post →
                        </Link>
                    </Button>
                </div>
                <br/>
                <hr/>
                <br/>
            </div>
        );
    });
}
