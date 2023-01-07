import * as React from "react";

import styles from "./SectionFooter.module.scss";
import {ArrowDown} from "../../components/Arrow";

interface Props {
}

const SectionFooter: React.FC<Props> = (props) => {
    return (
        <div className={styles.sectionFooter}>
            <div className={styles.sectionGutter}/>
            <ArrowDown/>
        </div>
    );
};

export default SectionFooter;
