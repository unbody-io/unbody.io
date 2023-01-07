import React, {FC} from 'react';
import {FooterItemProps} from "../../lib/data.types";
import {groupBy} from "../../lib/utils";

import styles from './Footer.module.scss';
import Link from "next/link";

interface FooterProps {
    data: FooterItemProps[]
}

const Footer: FC<FooterProps> = (props) => {
    const {data} = props;
    const cats = groupBy<FooterItemProps>(data, (d) => d.cat);

    return (
        <footer className={`${styles.footer}`}>
            <div className={`${styles.footerLinks} grid`}>
                <div className={"col-4"}>
                    <h3>Unbody</h3>
                    <small>hi@unbody.io</small>
                </div>
                {
                    Object.entries(cats).map(([key, items]) => (
                        <div className={"col-3"} key={key}>
                            <span className={`upper ${styles.catTitle}`}>{key}</span>
                            <div className={styles.catItems}>
                                {
                                    items.map(item => (
                                        item.external?
                                            <a href={item.link} className={"cap"}>{item.name}</a>:
                                            <Link href={item.link} className={"cap"}>{item.name}</Link>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }

            </div>
            <div>
                <img src={"/images/ascii-banner-footer.svg"}/>
                <div className={styles.copy}>
                    <small>©Unbody {new Date().getFullYear()}</small>
                </div>
            </div>

        </footer>
    );
};

export default Footer
