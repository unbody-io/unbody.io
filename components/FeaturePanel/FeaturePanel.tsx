import * as React from "react";

import styles from "./Feature.module.scss";
import ActionButtonGroup from "../../containers/ActionButtonGroup/ActionButtonGroup";
import {FeatureProp} from "../../lib/data.types";

interface Props {
    data: FeatureProp
}

const FeaturePanel: React.FC<React.PropsWithChildren<Props>> = (props) => {
    const {
        data:{
            key, title, benefits, video
        }
    } = props;

    return (
        <div className={`${styles.feature} grid`}>
            <div className={`col-8 ${styles.info}`}>
                <h2>{title}</h2>
                <ul>
                    {
                        benefits.map((b, i) => (
                            <li key={`b-${i}`}>
                                <h3>{b}</h3>
                            </li>
                        ))
                    }
                </ul>
                <ActionButtonGroup learnMoreLink={`/docs/features/${key}`}/>
            </div>
            <div className={`col-8 ${styles.video}`}>
                <video src={video} autoPlay={true} controls={false}/>
            </div>
        </div>
    );
};

export default FeaturePanel;
