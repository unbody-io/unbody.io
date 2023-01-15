import * as React from "react";

import styles from "./ActionButtonGroup.module.scss";
import Button from "../../components/Button/Button";
import Link from "next/link";
import {isValidLink} from "../../lib/utils";

interface Props{
    learnMoreLink: string;
}

const ActionButtonGroup: React.FC<Props> = (props) => {
    const {learnMoreLink} = props;
    return (
        <div className={styles.actionButtonGroup}>
            <Button style={"filled"}>
                <a href={"https://forms.gle/hnsyh2Ew1DSR7peN6"} className={"mono"} target={"_blank"}>JOIN WAITLIST</a>
            </Button>
            <Button style={"transparent"}>
                {
                    <Link href={learnMoreLink} aria-disabled={true} className={isValidLink(learnMoreLink)? "":"disabled"}>LEARN MORE</Link>
                }
            </Button>
        </div>
    );
};

export default ActionButtonGroup;
