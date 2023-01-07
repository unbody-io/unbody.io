import '../styles/globals.css'
import type {AppProps} from 'next/app'

import Header from "../containers/Header/Header";

export default function App({Component, pageProps}: AppProps) {
    return (
        <div className={"container"}>
            <Header tagline={"Unbody beta (v0)"}/>
            <Component {...pageProps} />
        </div>
    )
}
