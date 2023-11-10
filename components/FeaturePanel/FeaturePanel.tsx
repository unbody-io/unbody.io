import * as React from "react";

import styles from "./Feature.module.css";
import {FeatureProp} from "../../lib/data.types";
import NotionVideo from "../NotionVideo/NotionVideo";
import {ActionButtonGroup} from "../../containers/ActionButtonGroup/ActionButtonGroup";

interface Props {
    data: FeatureProp
}

const FeaturePanel: React.FC<React.PropsWithChildren<Props>> = (props) => {
    const {
        data:{
            slug, title, benefits, video, disabled
        }
    } = props;

    return (
        <div className={`${styles.feature} grid`}>
            <div className={`col-8 ${styles.info}`}>
                <h3>{title}</h3>
                {
                    disabled?
                        <div>Coming soon ...</div>
                        :
                        <>
                            <ul className={styles.benefits}>
                                {
                                    benefits.split("\n").map(b => b.trim()).filter(b => b.length).map((b, i) => (
                                        <li key={`b-${i}`}>
                                            <h4>{b}</h4>
                                        </li>
                                    ))
                                }
                            </ul>
                            <ActionButtonGroup learnMoreLink={`/docs`} learnMoreAlt={"Learn more"}/>
                        </>
                }
            </div>
            <div className={`col-8 ${styles.video}`}>
                {
                    (video&&!disabled)&&
                    <NotionVideo video={video}/>
                }
            </div>
        </div>
    );
};

export default FeaturePanel;
