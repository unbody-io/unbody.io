import * as React from "react";

import GoogleDriveLogo from "../../public/images/provider-logos/Google-Drive-black.svg";
import styles from "./ProviderCard.module.scss";
import {ProviderProp} from "../../lib/data.types";
import Tag from "../Tag/Tag";
import {ArrowRight} from "../Arrow";
import Button from "../Button/Button";
import Link from "next/link";


interface Props {
    data: ProviderProp
}

const ProviderCard: React.FC<Props> = (props) => {
    const {data} = props;
    return (
        <div className={`${styles.providerCard}`}>
            <div className={styles.providerLogo}>
                <GoogleDriveLogo/>
            </div>
            <div className={styles.providerName}>
                <h3>{data.name}</h3>
            </div>
            {
                data.status&&
                <div className={styles.status}>
                    <Tag isTransparent={false}>{data.status}</Tag>
                </div>
            }
            <div className={styles.desc}>
                <p dangerouslySetInnerHTML={{__html: data.copy_description}}/>
            </div>
            <div className={styles.footer}>
                <div className={styles.tags}>
                    {
                        data.tags.map((t, i) => <Tag key={`t-${t}-${i}-${data.name}`} isTransparent={true}>{t}</Tag>)
                    }
                </div>
                <div className={styles.arrow}>
                    <Link href={`/docs/providers/${data.name}`}>
                        <ArrowRight/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProviderCard;
