import * as React from "react";

import styles from "./Arrow.module.css";

interface Props {
    className?: string;
}

export const ArrowRight: React.FC<Props> = ({className}) => {
    return (
        <span className={`${styles.arrow} ${styles.right} ${className}`}>
            →
        </span>
    );
};


export const ArrowLeft: React.FC<Props> = ({className}) => {
    return (
        <span className={`${styles.arrow} ${styles.left} ${className}`}>
            ←
        </span>
    );
};
