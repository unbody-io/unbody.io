import * as React from "react";

import styles from "./ProviderCard.module.scss";
import {ProviderProp} from "../../lib/data.types";
import Tag from "../Tag/Tag";
import {ArrowRight} from "../Arrow";
import Link from "next/link";


interface Props {
    data: ProviderProp
    type: "file"|"provider"
}

const ProviderCard: React.FC<Props> = (props) => {
    const {data, type} = props;
    return (
        <div className={`${styles.providerCard} ${styles[type]}`}>
            <div className={styles.providerLogo}>
                {
                    (data.logo&&data.logo[0])&&
                    <img src={data.logo[0]} alt={data.name} />
                }
            </div>
            <div className={styles.providerName}>
                <h3>{data.name}</h3>
            </div>
            {
                data.status&&
                <div className={styles.status}>
                    <Tag isTransparent={false}>{data.status.name}</Tag>
                </div>
            }
            <div className={styles.desc}>
                <p dangerouslySetInnerHTML={{__html: data.copy_description}}/>
            </div>
            <div className={styles.footer}>
                <div className={styles.tags}>
                    {
                        data.tags.map((t, i) => <Tag key={`t-${t}-${i}-${data.name}`} isTransparent={true}>{t.name}</Tag>)
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

export default ProviderCard;
