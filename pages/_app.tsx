import '../styles/globals.css'
import type {AppProps} from 'next/app'
import NextNProgress from 'nextjs-progressbar';

import globalData from '../globaldata.preval'

import HeaderComponent from "../containers/Header/HeaderComponent";
import {FooterItemProps} from "../lib/data.types";
import Footer from "../containers/Footer/Footer";

export default function App({Component, pageProps}: AppProps) {
    return (
        <div className={"container"}>
            <NextNProgress color={"white"} height={1}/>
            <HeaderComponent tagline={"beta"}/>
            <Component {...pageProps} />
            <Footer data={globalData.footerData as Array<FooterItemProps>}/>
        </div>
    )
}
