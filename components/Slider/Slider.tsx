import * as React from "react";

import styles from "./Slider.module.scss";
import {useRef} from "react";
import {ArrowRight} from "../Arrow";

interface Props {
    className? :string
}

const Slider: React.FC<React.PropsWithChildren<Props>> = (props) => {
    const {children, className} = props;
    const sliderRef = useRef<HTMLDivElement>(null);
    const sliderInnerRef = useRef<HTMLDivElement>(null);

    const handleScrollLeft = () => {
        if(sliderRef.current && sliderInnerRef.current && sliderInnerRef.current.children.length >1){
            const box = sliderInnerRef.current.children[0].getBoundingClientRect()
            const box2 = sliderInnerRef.current.children[1].getBoundingClientRect()
            const dx = box.width+(box2.left-box.right);
            console.log(sliderInnerRef.current.scrollLeft,sliderRef.current.scrollLeft, dx )
            sliderRef.current.scrollTo({
                left: dx+sliderRef.current.scrollLeft-1,
                top: 0,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className={`${styles.wrapper} ${className}`}>
            <div className={styles.header}>
                <div onClick={handleScrollLeft}>
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
