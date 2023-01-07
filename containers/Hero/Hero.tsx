import * as React from "react";
import Banner from "../../public/images/banner.svg";

import styles from "./Hero.module.scss";

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
            <div className={styles.banner}>
                <img src={"/images/banner.svg"}/>
            </div>
        </section>
    );
};

export default Hero;
