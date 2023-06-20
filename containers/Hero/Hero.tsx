import * as React from "react";

import styles from "./Hero.module.css";
import Button from "../../components/Button/Button";
import SectionFooter from "../SectionFooter/SectionFooter";
import {useState} from "react";

interface Props {
    headline: string;
    description: string;
}

const whats = [
    "Manage",
    "Enhance",
    "Publish"
]

// a component that animate fade in and out a text in a loop with a given interval
// every time the text changes, the new text will be faded in and old text will be faded out
const AnimatedText: React.FC<{ texts: string[], interval: number }> = (props) => {
    const {texts, interval} = props;
    const [index, setIndex] = useState(0);

    //an interval to change the index
    React.useEffect(() => {
        const timer = setInterval(() => {
            setIndex((index + 1) % texts.length)
        }, interval);
        return () => clearInterval(timer);
    }, [index, interval, texts.length])

    return (
        <div className={styles.animatedText}>
            {
                texts.map((text, i) => (
                    <div className={`${styles.text} ${i==index ? styles.fadeIn : styles.fadeOut}`}>
                        {text}
                    </div>
                ))
            }
        </div>
    );
}

const Hero: React.FC<Props> = (props) => {
    const {headline, description} = props;
    const [whatIndex, setWhatIndex] = useState(0);

    //an interval to change the whatIndex
    React.useEffect(() => {
        const interval = setInterval(() => {
            setWhatIndex((whatIndex + 1) % whats.length)
        }, 400);
        return () => clearInterval(interval);
    }, [whatIndex])

    return (
        <section className={styles.hero}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}>
                <h1>
                    We don't need <s className={styles.CMS}>CMS<span className={styles.line}/></s>,<br/>→<AnimatedText texts={whats} interval={2000}/>Content <br/>❋✦Right Where It Is.
                </h1>
            </div>
            <div className={styles.action}>
                <p>{description}</p>
                <Button style={"filled"}>
                    <a href={"https://app.unbody.io"} target={"_blank"}>GET STARTED FOR FREE</a>
                </Button>
                <SectionFooter/>
            </div>
            {/*<AsciiBanner/>*/}
            {/*<div className={`${styles.banner}`}>*/}
            {/*    <div className={`grid ${styles.bannerImage}`}>*/}
            {/*        <div className={"col-4"}/>*/}
            {/*        <div className={`${styles.imageHolder} col-8`}>*/}
            {/*            <img src={"/images/banner-desktop.svg"} className={styles.desktop} alt={"with Unbody, we do not need CMS."}/>*/}
            {/*            <img src={"/images/banner-mobile.svg"} className={styles.mobile} alt={"with Unbody, we do not need CMS."}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className={styles.action}>*/}
            {/*        <Button style={"filled"}>*/}
            {/*            <a href={"https://app.unbody.io"} target={"_blank"}>GET STARTED FOR FREE</a>*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </section>
    );
};

export default Hero;
