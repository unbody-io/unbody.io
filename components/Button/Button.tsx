import React, {FC, PropsWithChildren} from 'react';
import styles from './Button.module.scss';

interface ButtonProps{
    size?: 'small' | 'medium' | 'large';
    style?: 'transparent' | 'filled';
    onClick?: () => void;
}

const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
    const {
        size = "medium",
        style = "transparent",
        onClick = ()=>{},
        children
    } = props;
    const className = [
        styles.button,
        styles[size],
        style === 'transparent' ? styles.transparent : styles.filled,
    ].join(' ');

    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
