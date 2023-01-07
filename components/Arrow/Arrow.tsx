import * as React from "react";

import styles from "./Arrow.module.scss";

interface Props {
    className?: string;
}

export const ArrowDown: React.FC<Props> = ({className}) => {
    return (
        <span className={`${styles.arrow} ${styles.down} ${className}`}>
            ↓
        </span>
    );
};

export const ArrowRight: React.FC<Props> = ({className}) => {
    return (
        <span className={`${styles.arrow} ${styles.right} ${className}`}>
            →
        </span>
    );
};
