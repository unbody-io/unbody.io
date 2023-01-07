import * as React from "react";

import styles from "./InfoSection.module.scss";
import ActionButtonGroup from "../ActionButtonGroup/ActionButtonGroup";
import {ArrowDown} from "../../components/Arrow";
import SectionFooter from "../SectionFooter/SectionFooter";

interface Props {
    label: string;
    title?: string;
    learnMoreLink: string;
}

const InfoSection: React.FC<React.PropsWithChildren<Props>> = (props) => {
    const {children, label, title, learnMoreLink} = props;
    return (
        <section className={`${styles.infoSection}`}>
            <div className={"grid"}>
                <div className={"col col-4"}>
                    <span className={"cap"}>{label}</span>
                </div>
                <div className={"col col-8"}>
                    {
                        title &&
                        <h2>{title}</h2>
                    }

                    <div className={styles.infoBody}>
                        {children}
                    </div>
                    <ActionButtonGroup learnMoreLink={learnMoreLink}/>
                </div>
            </div>
            <SectionFooter/>
        </section>
    );
};

export default InfoSection;
