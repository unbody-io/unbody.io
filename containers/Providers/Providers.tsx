import * as React from "react";

import styles from "./Providers.module.scss";
import {ProviderProp} from "../../lib/data.types";
import ProviderCard from "../../components/ProviderCard/ProviderCard";
import Slider from "../../components/Slider/Slider";
import List from "../../components/List/List";

interface Props {
    data: ProviderProp[]
    title: string;
    type?: "file"|"provider"
}

const Providers: React.FC<Props> = (props) => {
    const {data, title, type="provider"} = props;
    return (
        <div className={`${styles.container} ${styles[type]}`}>
            <div className={styles.desktop}>
                <Slider header={title}>
                    {
                        data.map(p => <ProviderCard type={type} key={p.id} data={p}/>)
                    }
                </Slider>
            </div>
            <div className={styles.mobile}>
                <List className={`${styles.mobileList} grid`}
                      itemsPerPage={4}
                      header={title}
                >
                    {
                        data.map(p => <ProviderCard type={type} key={p.id} data={p}/>)
                    }
                </List>
            </div>


        </div>
    );
};

export default Providers;
