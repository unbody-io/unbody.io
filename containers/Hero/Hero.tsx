import * as React from "react";

import styles from "./Hero.module.scss";
import Button from "../../components/Button/Button";
import SectionFooter from "../SectionFooter/SectionFooter";


interface Props {
    headline: string;
    description: string;
}

const Hero: React.FC<Props> = (props) => {
    const {headline, description} = props;
    return (
        <section className={styles.hero}>
            <h1>{headline}</h1>
            <p>{description}</p>
            <hr/>
            <hr/>
            {/*<AsciiBanner/>*/}
            <div className={`${styles.banner}`}>
                <div className={`grid ${styles.bannerImage}`}>
                    <div className={"col-4"}/>
                    <div className={`${styles.imageHolder} col-8`}>
                        <img src={"/images/banner-desktop.svg"} className={styles.desktop}/>
                        <img src={"/images/banner-mobile.svg"} className={styles.mobile}/>
                    </div>
                </div>
                <div className={styles.action}>
                    <Button style={"filled"}>
                        <a href={"https://forms.gle/hnsyh2Ew1DSR7peN6"} target={"_blank"}>JOIN WAITINGLIST</a>
                    </Button>
                </div>
            </div>
            <SectionFooter/>
        </section>
    );
};

export default Hero;
