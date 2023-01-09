import * as React from "react";

import styles from "./Slider.module.scss";
import {useRef, useState} from "react";
import {ArrowLeft, ArrowRight} from "../Arrow";

interface Props {
    className? :string
    header: string;
}

const Slider: React.FC<React.PropsWithChildren<Props>> = (props) => {
    const {children, className, header} = props;
    const sliderRef = useRef<HTMLDivElement>(null);
    const sliderInnerRef = useRef<HTMLDivElement>(null);

    const [canBack, setCanBack] = useState(false);
    const [canNext, setCanNext] = useState(true);


    const handleScroll = (dir: number) => {
        if(sliderRef.current && sliderInnerRef.current && sliderInnerRef.current.children.length >1){
            const box = sliderInnerRef.current.children[0].getBoundingClientRect()
            const box2 = sliderInnerRef.current.children[1].getBoundingClientRect()
            const dx = box.width+(box2.left-box.right);
            const nextScroll = (dx*dir)+(sliderRef.current.scrollLeft-1);

            setCanNext(sliderRef.current.scrollLeft+sliderRef.current.offsetWidth < sliderRef.current.scrollWidth)
            setCanBack(sliderRef.current.scrollLeft>0 || nextScroll>sliderRef.current.scrollLeft)

            if(nextScroll <= 0){
                setCanBack(false)
            }

            sliderRef.current.scrollTo({
                left: nextScroll,
                top: 0,
                behavior: 'smooth'
            })
        }
    }

    const handleScrollLeft = () => {
        handleScroll(1)
    }

    const handleScrollRight = () => {
        handleScroll(-1)
    }

    return (
        <div className={`${styles.wrapper} ${className}`}>
            <div className={styles.header}>
                <div className={canBack? styles.active: ""} onClick={handleScrollRight}>
                    <ArrowLeft/>
                </div>
                <div className={`${styles.headerTitle}`}>
                    {header}
                </div>
                <div className={canNext? styles.active: ""} onClick={handleScrollLeft}>
                    <ArrowRight/>
                </div>
            </div>
            <div className={styles.slider} ref={sliderRef}>
                <div className={`grid ${styles.sliderInner}`} ref={sliderInnerRef}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Slider;
