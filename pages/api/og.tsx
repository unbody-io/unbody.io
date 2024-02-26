import {ImageResponse} from "@vercel/og";
import {NextRequest} from "next/server";
import {SITE_TITLE} from "../../lib/app.config";

export const runtime = 'edge'

export const contentType = 'image/png'

export const size = {
    width: 1200,
    height: 630,
}

export default async function handler(req: NextRequest) {
    try {
        const {searchParams, href, protocol, host} = new URL(req.url);
        let curretPath = href;
        if (curretPath.includes("another")) {

        }

        const hasTitle = searchParams.has("title");
        const title = hasTitle ? searchParams.get("title") : SITE_TITLE;


        const hasMp = searchParams.has("mp");
        const mp = hasMp ? searchParams.get("mp")?.slice(0, 100) : "unbody.io";

        const DMsans_Light = await fetch(
            new URL("../../public/fonts/DMSans-Medium.ttf", import.meta.url)
        ).then((res) => res.arrayBuffer());

        const DMsans_Bold = await fetch(
            new URL("../../public/fonts/DMSans-Bold.ttf", import.meta.url)
        ).then((res) => res.arrayBuffer());


        const cover = searchParams.get('cover') &&
        searchParams.has('cover') ?
            `${protocol}//${host}/_next/image?url=${encodeURIComponent(searchParams.get('cover'))}&w=1200&q=75`
            : null;

        return new ImageResponse(
            (
                <div
                    style={{
                        display: "flex",
                        height: "100%",
                        width: "100%",
                        backgroundColor: "black",
                        backgroundSize: "100px 100px",
                    }}
                >
                    <div style={{
                        width: cover? "50%": "100%",
                        display: "flex",
                        textAlign: "left",
                        alignItems: "stretch",
                        justifyContent: "space-between",
                        flexDirection: "column",
                        flexWrap: "nowrap",
                    }}>
                        <div style={{
                            display: "flex",
                            padding: "40px 0 0px 40px",
                        }}>
                            <svg
                                height={110}
                                viewBox="0 0 75 65"
                                fill="white"
                                style={{margin: "0 0px"}}
                            >
                                <path
                                    d="M15.0048 34.5635C11.0263 34.5584 7.21226 32.9754 4.39932 30.1619C1.58638 27.3484 0.0042582 23.534 0 19.5554V9.1145H5.47152V19.5554C5.47152 22.0838 6.47592 24.5087 8.26376 26.2965C10.0516 28.0844 12.4764 29.0888 15.0048 29.0888C17.5332 29.0888 19.9581 28.0844 21.7459 26.2965C23.5337 24.5087 24.5381 22.0838 24.5381 19.5554V9.1145H30V19.5554C29.9949 23.532 28.4138 27.3445 25.6032 30.1576C22.7925 32.9706 18.9814 34.555 15.0048 34.5635V34.5635Z"/>
                                <path d="M12.2785 0H4.14844V5.47473H12.2785V0Z"/>
                                <path d="M23.1959 0.00317383H17.7212V5.5809H23.1959V0.00317383Z"/>
                            </svg>
                        </div>
                        <div
                            style={{
                                fontSize: title.length > 20 ? "60px" : "100px",
                                lineHeight: title.length > 20 ? "70px" : "110px",
                                backgroundImage:
                                    "linear-gradient(400deg, rgb(255, 255, 255), rgb(0, 0, 0))",
                                backgroundClip: "text",
                                color: "transparent",
                                fontFamily: "DMSans_Light",
                                padding: "0 40px",
                            }}
                        >
                            {title}
                        </div>

                        <div
                            style={{
                                fontSize: "24px",
                                fontFamily: "DMSans_Light",
                                color: "white",
                                padding: "0 0 40px 40px",
                            }}
                        >
                            {mp}
                        </div>
                    </div>
                    {
                        cover && (
                            <div style={{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                backgroundImage: `url(${cover})`,
                                backgroundSize: "cover",
                                backgroundPosition: "-25% 0px",
                                backgroundRepeat: "no-repeat",
                            }}/>
                        )
                    }
                </div>
            ),
            {
                ...size,
                fonts: [
                    {
                        name: "DMSans_Light",
                        data: DMsans_Light,
                        style: "normal",
                    },
                    {
                        name: "DMSans_Bold",
                        data: DMsans_Bold,
                    },
                ],
            }
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
