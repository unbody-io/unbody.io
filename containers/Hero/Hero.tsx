import * as React from "react";
import Banner from "../../public/images/banner.svg";

import styles from "./Hero.module.scss";
import {AsciiBanner} from "./AsciiBanner";

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
            <AsciiBanner/>
        </section>
    );
};

export default Hero;
