import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server';
import {AppConfig} from "../../lib/config";

export const config = {
    runtime: 'edge',
};

export default function handler(req: NextRequest) {

    try{
        const { searchParams } = new URL(req.url);
        // ?title=<title>
        const hasTitle = searchParams.has('title');
        const title = hasTitle
            ? searchParams.get('title')?.slice(0, 100)
            : AppConfig.title

        return new ImageResponse(
            (
                <div
                    style={{
                        display: 'flex',
                        height: '100%',
                        width: '100%',
                        color: "white",
                        background: "rgba(0,0,0)",
                        fontFamily: "Arial, Helvetica, sans-serif",
                        paddingLeft: "40px",
                        flexDirection: "column",
                        padding: "80px 80px",
                        fontSize: "28px"
                    }}
                >
                    <div style={{display: "flex",
                        height: "80px",
                    }}>
                        <svg width="27" height="36" viewBox="0 0 30 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.0048 34.5635C11.0263 34.5584 7.21226 32.9754 4.39932 30.1619C1.58638 27.3484 0.0042582 23.534 0 19.5554V9.1145H5.47152V19.5554C5.47152 22.0838 6.47592 24.5087 8.26376 26.2965C10.0516 28.0844 12.4764 29.0888 15.0048 29.0888C17.5332 29.0888 19.9581 28.0844 21.7459 26.2965C23.5337 24.5087 24.5381 22.0838 24.5381 19.5554V9.1145H30V19.5554C29.9949 23.532 28.4138 27.3445 25.6032 30.1576C22.7925 32.9706 18.9814 34.555 15.0048 34.5635V34.5635Z" fill="white"/>
                            <path d="M12.2785 0H4.14844V5.47473H12.2785V0Z" fill="white"/>
                            <path d="M23.1959 0.00317383H17.7212V5.5809H23.1959V0.00317383Z" fill="white"/>
                        </svg>
                        <span style={{marginLeft: "12x", marginTop: "4px"}}> / Unbody.io</span>
                    </div>
                    <h1
                        style={{
                            backgroundImage: 'linear-gradient(0deg, rgb(10,10, 10), rgb(255, 255, 255))',
                            backgroundClip: 'text',
                            //@ts-ignore
                            '-webkit-background-clip': 'text',
                            color: 'transparent',
                            fontSize: "120px",
                            maxWidth: "70%",
                            lineHeight: "90%",
                            fontWeight: "bold"
                        }}
                    >
                        {title}
                    </h1>
                </div>

            ),
            {
                width: 1200,
                height: 630,
            },

        )

    }catch (e: any){
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
