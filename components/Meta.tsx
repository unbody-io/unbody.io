import Head from 'next/head';
import {useRouter} from 'next/router';
import {NextSeo} from 'next-seo';
import {AppConfig} from "../lib/config";

type IMetaProps = {
    title: string;
    description: string;
    image?: string;
};

const Meta = (props: IMetaProps) => {
    const router = useRouter();

    return (
        <>
            <Head>
                <meta charSet="UTF-8" key="charset"/>
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                    key="viewport"
                />
                <link
                    rel="apple-touch-icon"
                    href={`${router.basePath}/apple-touch-icon.png`}
                    key="apple"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href={`${router.basePath}/favicon-32x32.png`}
                    key="icon32"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href={`${router.basePath}/favicon-16x16.png`}
                    key="icon16"
                />
                <link
                    rel="icon"
                    href={`${router.basePath}/favicon.ico`}
                    key="favicon"
                />
                <link rel="manifest"
                      href="/site.webmanifest"
                />
                <title>{props.title}</title>
                {/*<meta*/}
                {/*    property="og:image"*/}
                {/*    content="https://inthepocket.tech/api/og-image?name=Next.js&stage=adopt"*/}
                {/*/>*/}
            </Head>
            <NextSeo
                title={props.title}
                description={props.description}
                twitter={{
                    handle: "unbody_io",
                    site: AppConfig.siteUrl
                }}
                openGraph={{
                    title: props.title,
                    description: props.description,
                    url: AppConfig.siteUrl,
                    site_name: AppConfig.site_name,
                    images: [
                        {
                            url: `https://unbody.io/api/og?title=${props.title}`,
                            width: 1200,
                            height: 630
                        }
                    ]
                    // images: [
                    //     {
                    //         url: props.image||AppConfig.image,
                    //         width: 1100,
                    //         height: 438
                    //     }NEXT_PUBLIC_BASE_URL
                    // ]
                }}
            />
        </>
    );
};

export {Meta};
