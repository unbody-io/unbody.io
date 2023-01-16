import React, {useEffect, useRef, useState} from 'react';

import styles from "./Toc.module.scss"
import Button from "../Button/Button";
import {indexGenerator, rnrSlugify} from "@9gustin/react-notion-render";
import Link from "next/link";
import {NotionBlock} from "@9gustin/react-notion-render/dist/types/NotionBlock";

interface Props {
    content: NotionBlock[];
}



export function useScrollSpy(
    ids: string[],
    options: IntersectionObserverInit = {}
) {
    const [activeId, setActiveId] = useState<string>();
    const observer = useRef();
    useEffect(() => {
        const elements = ids.map((id) =>
            document.getElementById(id)
        );
        if(observer.current){
            //@ts-ignore
            observer.current?.disconnect();
        }
        //@ts-ignore
        observer.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry?.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        }, options);
        elements.forEach((el) => {
            if (el) {
                //@ts-ignore
                observer.current?.observe(el);
            }
        });
        //@ts-ignore
        return () => observer.current?.disconnect();
    }, [ids, options]);
    return activeId;
}

function useHeadings() {
    const [headings, setHeadings] = useState([]);
    useEffect(() => {
        const elements = Array.from(document.querySelectorAll("h2, h3, h4, h5, h6"))
            .filter((element) => element.id)
            .map((element) => ({
                id: element.id,
                text: element.textContent ?? "",
                level: Number(element.tagName.substring(1))
            }));
        //@ts-ignore
        setHeadings(elements);
    }, []);
    return headings;
}


const Toc = ({ content }: Props) => {
    const headings = useHeadings();
    const activeId = useScrollSpy(
        headings.map(({ id }) => id),
        { rootMargin: "110px 0px -40% 0px" }
    );
    return (
        <ul className={styles.toc}>
            {
                indexGenerator(content)
                    .map(({id, plainText, type}) => (
                        <li key={id} className={`${styles[type]} ${activeId===rnrSlugify(plainText)? styles.active:""} ${styles.tocItem}`}>
                            <Link href={`#${rnrSlugify(plainText)}`}>
                                <span>{plainText}</span>
                            </Link>
                        </li>
                    ))
            }
        </ul>
    );
}

export default Toc;
