import * as React from "react";

import styles from "./SourceCard.module.css";
import Tag from "../Tag/Tag";
import {ArrowRight} from "../Arrow";
import {SelectPropertyResponse} from "../../lib/notion.types";

export interface SourceCardProps {
    id: string;
    type: "file"|"provider"
    name: string
    status: SelectPropertyResponse|null
    logo: string[]|null
    copy_description: string
    tags: SelectPropertyResponse[]
}

const SourceCard: React.FC<SourceCardProps> = (props) => {
    const {name, copy_description, status, tags, logo, type} = props;
    return (
        <div className={`${styles.sourceCard} ${styles[type]}`}>
            <div className={styles.sourceLogo}>
                {
                    (logo&&logo[0])&&
                    <img src={logo[0]} alt={name} />
                }
            </div>
            <div className={styles.sourceName}>
                <h3>{name}</h3>
            </div>
            {
                status&&
                <div className={styles.status}>
                    <Tag isTransparent={false}>{status.name}</Tag>
                </div>
            }
            <div className={styles.desc}>
                <p dangerouslySetInnerHTML={{__html: copy_description}}/>
            </div>
            <div className={styles.footer}>
                <div className={styles.tags}>
                    {
                        tags.map((t, i) => <Tag key={`t-${t}-${i}-${name}`} isTransparent={true}>{t.name}</Tag>)
                    }
                </div>
                <div className={styles.arrow}>
                    <ArrowRight/>
                    {/*<Link href={``} className={"disabled"}>*/}

                    {/*</Link>*/}
                </div>
            </div>
        </div>
    );
};

export default SourceCard;
