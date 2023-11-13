import React from "react";
import {DocsThemeConfig, useConfig} from "nextra-theme-docs";
import Footer from "./containers/Footer/Footer";
import {useRouter} from "next/router";

const logo = (
    <div className={"logo-container"}>
        <div className={"logo-content"}>
            <svg
                width="20"
                height="22"
                viewBox="0 0 30 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M15.0048 34.5635C11.0263 34.5584 7.21226 32.9754 4.39932 30.1619C1.58638 27.3484 0.0042582 23.534 0 19.5554V9.1145H5.47152V19.5554C5.47152 22.0838 6.47592 24.5087 8.26376 26.2965C10.0516 28.0844 12.4764 29.0888 15.0048 29.0888C17.5332 29.0888 19.9581 28.0844 21.7459 26.2965C23.5337 24.5087 24.5381 22.0838 24.5381 19.5554V9.1145H30V19.5554C29.9949 23.532 28.4138 27.3445 25.6032 30.1576C22.7925 32.9706 18.9814 34.555 15.0048 34.5635V34.5635Z"/>
                <path d="M12.2785 0H4.14844V5.47473H12.2785V0Z"/>
                <path d="M23.1959 0.00317383H17.7212V5.5809H23.1959V0.00317383Z"/>
            </svg>
            <span>nbody</span>
        </div>
        <style jsx>{`
          .logo-container {
            padding: 1rem 0.5rem 0.5rem 0;
            mask-image: linear-gradient(60deg,
            black 25%,
            rgba(0, 0, 0, 0.2) 50%,
            black 75%);
            mask-size: 400%;
            mask-position: 0;
          }

          .logo-container svg path {
            fill: var(--foreground);
          }

          .logo-container:hover {
            mask-position: 100%;
            transition: mask-position 1s ease, -webkit-mask-position 1s ease;
          }

          .logo-content {
            display: flex;
            flex-direction: row;
            font-weight: 600;
            gap: 2px;
          }

          .logo-content span {
            font-size: 26px;
            transform: translateY(-7px);
          }

          @media (max-width: 768px) {
            .logo-content span {
              transform: translateY(2px);
            }
          }
        `}</style>
    </div>
);

const config: DocsThemeConfig = {
  logo: logo,
  nextThemes: {
    defaultTheme: "dark",
    forcedTheme: "dark",
  },
  themeSwitch: {
    component: null,
  },
  project: {
    link: "https://github.com/unbody-io",
  },
  chat: {
    link: "https://discord.com/invite/q2BTSNUD",
  },
    sidebar: {
        defaultMenuCollapseLevel: 1,
    },
    docsRepositoryBase: "https://github.com/unbody-io/unbody.io/docs",
    footer: {
        text: () => <Footer/>,
    },
    banner: {
        key: "websummit-2023",
        text: (
            <a href="https://unbody.io/blog/websummit-2023" target="_blank">
                🎉 Unbody is at Web Summit 13-16 Nov 2023. Read more →
            </a>
        ),
    },
    head: () => {
        const router = useRouter();
        const {frontMatter, title} = useConfig();

        const ogImageTitle = title && title !== "Unbody" ? `${title}` : "Unbody";

        const BASE_PATH = "unbody.io";
        let myPath: string = router.pathname;
        let mptext;
        if (myPath == "/") {
            mptext = "";
        } else {
            const desctext = myPath.split("/");
            mptext = desctext[1];
        }
    const ogTitle =
      title && title !== "Unbody" ? `${title} - Unbody` : "Unbody - A more human CMS";

    const ogDescription =
      frontMatter.outline ||
      "An invisible AI layer that turns any interface into your CMS and beyond, from Google Docs to desktop folders.";

        return (
            <>
                <title>{ogTitle}</title>
                <meta charSet="UTF-8" key="charset"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap"
                    rel="stylesheet"
                />
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
                <link rel="manifest" href="/site.webmanifest"/>
                <meta name="msapplication-TileColor" content="#000"/>
                <meta name="apple-mobile-web-app-title" content="Unbody"/>
                <meta name="description" content={ogDescription}/>
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:site" content="@unbody_io"/>
                <meta
                    name="twitter:image"
                    content={`/api/param?title=${ogTitle}&mp=${BASE_PATH}/${mptext}`}
                />
                <meta property="og:title" content={ogTitle}/>
                <meta property="og:description" content={ogDescription}/>

                <meta
                    property="og:image"
                    content={`/api/param?title=${ogImageTitle}&mp=${BASE_PATH}/${mptext}`}
                />
            </>
        );
    },
};
export default config;
