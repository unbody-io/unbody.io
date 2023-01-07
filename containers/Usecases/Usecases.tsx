import * as React from "react";

import styles from "./Usecases.module.scss";
import {UseCasesProps} from "../../lib/data.types";
import {ArrowRight} from "../../components/Arrow";
import Button from "../../components/Button/Button";

interface Props {
    data: UseCasesProps[]
}

const UseCases: React.FC<Props> = (props) => {
    const {data} = props;
    return (
        <>
            {
                data.map((u)=>(
                    <div key={u.title} className={`${styles.useCaseCard} cap`}>
                        <h2>{u.title}</h2>
                        <p dangerouslySetInnerHTML={{__html: u.outline}}/>
                        <Button size={"small"}>
                            <a href={u.link}>Read more <ArrowRight/></a>
                        </Button>
                    </div>
                ))
            }
        </>
    );
};

export default UseCases;
