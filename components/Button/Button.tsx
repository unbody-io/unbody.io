import React, {FC, PropsWithChildren} from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    size?: 'small' | 'medium' | 'large';
    style?: 'transparent' | 'filled';
    onClick?: () => void;
    className?: string
    htmlProps?: any
}

const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
    const {
        size = "medium",
        style = "transparent",
        onClick = ()=>{},
        children,
        className,
        htmlProps = {}
    } = props;
    const classNames = [
        styles.button,
        styles[size],
        style === 'transparent' ? styles.transparent : styles.filled,
        className
    ].join(' ');

    return (
        <button className={classNames}
                onClick={onClick}
                {...htmlProps}
        >
            {children}
        </button>
    );
};

export default Button;
