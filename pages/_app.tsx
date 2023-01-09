import '../styles/globals.css'
import type {AppProps} from 'next/app'
import NextNProgress from 'nextjs-progressbar';

import globalData from '../globaldata.preval'

import Header from "../containers/Header/Header";
import {FooterItemProps} from "../lib/data.types";
import Footer from "../containers/Footer/Footer";

export default function App({Component, pageProps}: AppProps) {
    return (
        <div className={"container"}>
            <NextNProgress color={"white"} height={1}/>
            <Header tagline={"Unbody beta (v0)"}/>
            <Component {...pageProps} />
            <Footer data={globalData.footerData as Array<FooterItemProps>}/>
        </div>
    )
}
