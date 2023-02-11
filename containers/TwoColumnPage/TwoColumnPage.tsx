import * as React from "react";

import styles from "./TwoColumnPage.module.scss";
import Link from "next/link";
import {ArrowLeft} from "../../components/Arrow";

interface Props {
    withToc: boolean;
    backLink: string;
    backLinkText: string;
    leftPanelContent?: React.ReactElement
    className?: string;
}

const TwoColumnPage: React.FC<React.PropsWithChildren<Props>> = (props) => {
    const {children, backLink, className, leftPanelContent = null, backLinkText="/"} = props;
    return (
        <div className={`${styles.container} ${className} contentContainer grid`}>
            <div className={`col-4 ${styles.leftPanel}`}>
                <Link className={styles.back}
                      href={backLink}
                      title={`Go back to ${backLinkText}`}
                >
                    <ArrowLeft/>
                    {/*<span>{backLinkText}</span>*/}
                </Link>
                <div className={styles.leftPanelContent}>
                    {leftPanelContent}
                </div>
            </div>
            <article className={`${styles.content} col-8`}>
                {children}
            </article>
        </div>
    );
};

export default TwoColumnPage;
