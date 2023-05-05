import * as React from "react";

import styles from "./ActionButtonGroup.module.scss";
import Button from "../../components/Button/Button";
import Link from "next/link";
import {isValidLink} from "../../lib/utils";

interface Props{
    learnMoreLink: string;
    learnMoreAlt?: string
}

const ActionButtonGroup: React.FC<Props> = (props) => {
    const {learnMoreLink, learnMoreAlt=""} = props;
    return (
        <div className={styles.actionButtonGroup}>
            <Button style={"filled"}>
                <Link href={""} legacyBehavior>
                    <a href={"https://app.unbody.io"}
                       title={"Get Started for Free"}
                       className={"mono"}>
                        GET STARTED FOR FREE
                    </a>
                </Link>
            </Button>
            {
                isValidLink(learnMoreLink)&&
                <Button style={"transparent"}>
                    {
                        <Link href={learnMoreLink}
                              className={isValidLink(learnMoreLink)? "":"disabled"}
                              title={learnMoreAlt}
                        >
                            LEARN MORE
                        </Link>
                    }
                </Button>
            }

        </div>
    );
};

export default ActionButtonGroup;
