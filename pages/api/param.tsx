import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
  try {
    const { searchParams, href } = new URL(req.url);
    let curretPath = href;
    if (curretPath.includes("another")) {
      curretPath = "unbody.io/another";
    }
    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle ? searchParams.get("title") : "My default title";
    // console.log(searchParams);

    const hasMp = searchParams.has("mp");
    const mp = hasMp ? searchParams.get("mp")?.slice(0, 100) : "unbody.io";

    const DMsans_Light = await fetch(
      new URL("../../public/fonts/DMSans-Light.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    const DMsans_Bold = await fetch(
      new URL("../../public/fonts/DMSans-Bold.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "left",
            alignItems: "stretch",
            justifyContent: "space-between",
            flexDirection: "column",
            flexWrap: "nowrap",
            backgroundColor: "black",
            backgroundSize: "100px 100px",
            padding: "40px 80px 40px 80px",
          }}
        >
          <div style={{ display: "flex" }}>
            <svg
              height={80}
              viewBox="0 0 75 65"
              fill="white"
              style={{ margin: "0 0px" }}
            >
              <path d="M15.0048 34.5635C11.0263 34.5584 7.21226 32.9754 4.39932 30.1619C1.58638 27.3484 0.0042582 23.534 0 19.5554V9.1145H5.47152V19.5554C5.47152 22.0838 6.47592 24.5087 8.26376 26.2965C10.0516 28.0844 12.4764 29.0888 15.0048 29.0888C17.5332 29.0888 19.9581 28.0844 21.7459 26.2965C23.5337 24.5087 24.5381 22.0838 24.5381 19.5554V9.1145H30V19.5554C29.9949 23.532 28.4138 27.3445 25.6032 30.1576C22.7925 32.9706 18.9814 34.555 15.0048 34.5635V34.5635Z" />
              <path d="M12.2785 0H4.14844V5.47473H12.2785V0Z" />
              <path d="M23.1959 0.00317383H17.7212V5.5809H23.1959V0.00317383Z" />
            </svg>
          </div>

          <div
            style={{
              fontSize: "100px",
              backgroundImage:
                "linear-gradient(400deg, rgb(255, 255, 255), rgb(0, 0, 0))",
              backgroundClip: "text",
              lineHeight: "110px",
              color: "transparent",
              fontFamily: "DMSans_Light",
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: "24px",
              fontFamily: "DMSans_Light",
              textTransform: "capitalize",
              color: "white",
            }}
          >
            {mp}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
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
