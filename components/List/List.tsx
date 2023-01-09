import React, { useState } from 'react';

import styles from "./List.module.scss"
import Button from "../Button/Button";

interface Props {
    children: React.ReactNode;
    itemsPerPage: number;
    className?: string
    header: string;
}

const Gallery = ({ children, header, className, itemsPerPage = 4 }: Props) => {
    const [page, setPage] = useState(1);
    const items = React.Children.toArray(children);
    const displayedItems = items.slice(0, page*itemsPerPage);

    const handleShowMore = () => {
        setPage(page + 1);
    }
    const handleShowLess = () => {
        setPage(1);
    }
    return (
        <div className={`${styles.wrapper}`}>
            <h3 className={styles.header}>{header}</h3>
            <div className={`${styles.list} ${className}`}>
                {displayedItems}
            </div>
            <div className={styles.pagination}>
                {page * itemsPerPage < items.length ? (
                        <Button onClick={handleShowMore}>Show More</Button>
                    ):
                    <Button onClick={handleShowLess}>Show Less</Button>
                }
            </div>
        </div>
    );
}

export default Gallery;
