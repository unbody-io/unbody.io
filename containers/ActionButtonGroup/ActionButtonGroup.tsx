import * as React from "react";

import styles from "./ActionButtonGroup.module.scss";
import Button from "../../components/Button/Button";
import Link from "next/link";
import {useEffect, useState} from "react";

interface Props{
    learnMoreLink: string;
    disabled?: boolean
}

const ComingSoon = () => {
    const [hover, setHover] = useState(false);
    return (
        <Button style={"transparent"}
                className={"disabled"}
                htmlProps={{
                    // onMouseEnter: () => onHover(true),
                    // onMouseLeave: () => onHover(false),
                }}
        >
            {
                <Link href={"javascript:;"}
                      className={"disabled"}
                >
                    {
                        `${hover}`
                    }
                </Link>
            }
        </Button>
    )
}

const ActionButtonGroup: React.FC<Props> = (props) => {
    const {learnMoreLink, disabled = true} = props;
    return (
        <div className={styles.actionButtonGroup}>
            <Button style={"filled"}>
                <a href={"https://forms.gle/hnsyh2Ew1DSR7peN6"} className={"mono"} target={"_blank"}>JOIN WAITLIST</a>
                {/*<ComingSoon/>*/}
            </Button>
        </div>
    );
};

export default ActionButtonGroup;
