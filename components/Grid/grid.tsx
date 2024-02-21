import styles from './grid.module.css'

export const Grid = ({ children, className = "", ...rest}) => (
    <div className={`${styles.container} ${className}`} {...rest}>
        {children}
    </div>
)

export const GridItem = ({children, className = "", ...rest}) => (
    <div className={`${styles.item} ${className}`} {...rest}>
        {children}
    </div>
)
