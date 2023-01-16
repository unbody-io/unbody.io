import * as React from "react";

import styles from "./Feature.module.scss";
import ActionButtonGroup from "../../containers/ActionButtonGroup/ActionButtonGroup";
import {FeatureProp} from "../../lib/data.types";
import NotionVideo from "../NotionVideo/NotionVideo";

interface Props {
    data: FeatureProp
}

const FeaturePanel: React.FC<React.PropsWithChildren<Props>> = (props) => {
    const {
        data:{
            slug, title, benefits, video
        }
    } = props;

    return (
        <div className={`${styles.feature} grid`}>
            <div className={`col-8 ${styles.info}`}>
                <h2>{title}</h2>
                <ul>
                    {
                        benefits.split("\n").map(b => b.trim()).filter(b => b.length).map((b, i) => (
                            <li key={`b-${i}`}>
                                <h3>{b}</h3>
                            </li>
                        ))
                    }
                </ul>
                <ActionButtonGroup learnMoreLink={`/features/${slug}`}/>
            </div>
            <div className={`col-8 ${styles.video}`}>
                <NotionVideo video={video}/>
            </div>
        </div>
    );
};

export default FeaturePanel;
