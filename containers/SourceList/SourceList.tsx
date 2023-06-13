import * as React from "react";

import styles from "./SourceList.module.css";
import Slider from "../../components/Slider/Slider";
import List from "../../components/List/List";
import SourceCard, {SourceCardProps} from "../../components/SourceCard/SourceCard";

interface Props {
    title: string;
    type?: "file"|"provider"
    data: SourceCardProps[]
}

const SourceList: React.FC<Props> = (props) => {
    const {data, title, type="provider"} = props;
    return (
        <div className={`${styles.container} ${styles[type]}`}>
            <div className={styles.desktop}>
                <Slider header={title}>
                    {
                        data.map(p => <SourceCard key={p.id} {...{...p, type}}/>)
                    }
                </Slider>
            </div>
            <div className={styles.mobile}>
                <List className={`${styles.mobileList} grid`}
                      itemsPerPage={4}
                      header={title}
                >
                    {
                        data.map(p => <SourceCard key={p.id} {...{...p, type}}/>)
                    }
                </List>
            </div>
        </div>
    );
};

export default SourceList;
