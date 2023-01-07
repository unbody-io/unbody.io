import * as React from "react";
import styles from "./Hero.module.scss";


export const AsciiBanner = () => {
    return (
        <div className={styles.asciiBanner}>
            <div className={`${styles.asciiBannerContainer} ${styles.desktop}`}>
                <img src={"/images/ascii-banner-desktop.svg"} title={"Join Waiting-list"}/>
                <a className={styles.clickBox} href={"https://forms.gle/hnsyh2Ew1DSR7peN6"} title={"Join Waiting-list"}/>
            </div>
            <div className={`${styles.asciiBannerContainer} ${styles.mobile}`}>
                <img src={"/images/ascii-banner-mobile.svg"} title={"Join Waiting-list"}/>
                <a className={styles.clickBox} href={"https://forms.gle/hnsyh2Ew1DSR7peN6"} title={"Join Waiting-list"}/>
            </div>
        </div>
    )
}
