import Link from "next/link";
import {useRouter} from "next/router";
import {getPagesUnderRoute} from "nextra/context";
import Button from "../../components/Button/Button";
import Tag from "../../components/Tag/Tag";
import {Page} from "nextra";
import {BlogPostAuthors} from "../../components/BlogPostAuthors";

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
        authors: string;
        seo_tags: string;
    }
}
export default function BlogIndex({more = "Read more"}) {
    const {locale, defaultLocale} = useRouter();
    const pages = getPagesUnderRoute("/blog");

    return pages.map((page: TPage) => {
        return (
            <div key={page.route} className="mb-10">
                {page.frontMatter?.date ? (
                    <small style={{
                        display: "flex",
                        gap: "0.5rem",
                    }}>
                        <time>{page.frontMatter.date}</time>
                        <span> - </span>
                        <BlogPostAuthors  authors={page.frontMatter.authors.split(",")}/>
                    </small>
                ) : null}
                <br/>
                <h2>
                    <Link
                        href={page.route}
                        style={{color: "inherit", textDecoration: "none"}}
                        className="block font-semibold mt-8 text-2xl "
                    >
                        {page.meta?.title || page.frontMatter?.title || page.name}
                    </Link>
                </h2>
                <br/>
                <p className="">
                    {page.frontMatter?.outline}{" "}
                </p>
                <br/>
                <br/>
                <div>
                    <Button size={"small"}>
                        <Link href={page.route}>
                            {more + " →"}
                        </Link>
                    </Button>
                </div>
            </div>
        );
    });
}
