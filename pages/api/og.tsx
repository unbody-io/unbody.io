import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server';
import {AppConfig} from "../../lib/config";

import Logo from "/public/images/logo.svg"

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
                        display: 'block',
                        height: '100%',
                        width: '100%',
                        color: "white",
                        fontFamily: "Arial, Helvetica, sans-serif",
                        paddingLeft: "40px"
                    }}
                >
                    <div style={{
                        fontSize: "24px"
                    }}>
                        <Logo/><span>Unbody.io</span>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <h1
                        style={{
                            backgroundImage: 'linear-gradient(0deg, rgb(10,10, 10), rgb(255, 255, 255))',
                            backgroundClip: 'text',
                            //@ts-ignore
                            '-webkit-background-clip': 'text',
                            color: 'transparent',
                            fontSize: "100px",
                            maxWidth: "70%",
                            lineHeight: "90%",
                            fontWeight: "100",
                        }}
                    >
                        {title}
                    </h1>
                </div>

            ),
            {
                width: 800,
                height: 400,
            },
        )

    }catch (e: any){
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
