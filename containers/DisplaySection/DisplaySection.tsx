import * as React from "react";

import styles from "./DisplaySection.module.css";
import SectionFooter from "../SectionFooter/SectionFooter";

interface Props {
    label?: string;
    title: string;
    className?: string;
}

const DisplaySection: React.FC<React.PropsWithChildren<Props>> = (props) => {
    const {children, className, title, label} = props;
    return (
        <section className={`${styles.displaySection} ${className}`} id={label}>
            <div className={styles.title}>
                <h2 className={"headline"} dangerouslySetInnerHTML={{__html: title}}/>
            </div>
            <div className={styles.divider}>
                ↯
            </div>
            <div className={styles.content}>
                {children}
            </div>
            <SectionFooter/>
        </section>
    );
};

export default DisplaySection;
