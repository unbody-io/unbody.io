import * as React from "react";

import styles from "./Providers.module.scss";
import {ProviderProp} from "../../lib/data.types";
import ProviderCard from "../../components/ProviderCard/ProviderCard";
import Slider from "../../components/Slider/Slider";
import List from "../../components/List/List";

interface Props {
    data: ProviderProp[]
    title: string;
}

const Providers: React.FC<Props> = (props) => {
    const {data, title} = props;
    return (
        <div className={`${styles.providers}`}>
            <h3>{title}</h3>
            <div className={styles.desktop}>
                <Slider>
                    {
                        data.map(p => <ProviderCard key={p.notionId} data={p}/>)
                    }
                </Slider>
            </div>
            <div className={styles.mobile}>
                <List className={styles.mobileList} itemsPerPage={4}>
                    {
                        data.map(p => <ProviderCard key={p.notionId} data={p}/>)
                    }
                </List>
            </div>


        </div>
    );
};

export default Providers;
