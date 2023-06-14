import React from 'react'
import {DocsThemeConfig} from 'nextra-theme-docs'
import Footer from "./containers/Footer/Footer";

const logo = (
    <div className={"logo-container"}>
        <div className={"logo-content"}>
            <svg width="20" height="22" viewBox="0 0 30 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M15.0048 34.5635C11.0263 34.5584 7.21226 32.9754 4.39932 30.1619C1.58638 27.3484 0.0042582 23.534 0 19.5554V9.1145H5.47152V19.5554C5.47152 22.0838 6.47592 24.5087 8.26376 26.2965C10.0516 28.0844 12.4764 29.0888 15.0048 29.0888C17.5332 29.0888 19.9581 28.0844 21.7459 26.2965C23.5337 24.5087 24.5381 22.0838 24.5381 19.5554V9.1145H30V19.5554C29.9949 23.532 28.4138 27.3445 25.6032 30.1576C22.7925 32.9706 18.9814 34.555 15.0048 34.5635V34.5635Z"
                    fill="white"/>
                <path d="M12.2785 0H4.14844V5.47473H12.2785V0Z" fill="white"/>
                <path d="M23.1959 0.00317383H17.7212V5.5809H23.1959V0.00317383Z" fill="white"/>
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
            mask-position: 0%;
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
        `}</style>
    </div>
)

const config: DocsThemeConfig = {
    logo: logo,
    project: {
        link: 'https://github.com/unbody-io',
    },
    chat: {
        link: 'https://discord.com',
    },
    docsRepositoryBase: 'https://github.com/unbody-io/unbody.io/docs',
    footer: {
        text: () => <Footer/>
    }
}
export default config
