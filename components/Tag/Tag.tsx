import * as React from "react";

import styles from "./Tag.module.css";

interface Props {
    onClick?: () => void;
    isTransparent?: boolean;
}

const Tag: React.FC<React.PropsWithChildren<Props>> = (props) => {
    const {children, onClick = () => {}, isTransparent = true} = props;
    return (
        <span className={`${styles.tag} ${isTransparent ? styles.transparent : styles.solid}`}
              onClick={onClick}>
            {children}
        </span>
    );
};

export default Tag;
