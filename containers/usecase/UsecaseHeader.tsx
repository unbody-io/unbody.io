import React from "react";
import {Card} from "@nextui-org/react";

type Props = {
    title: string;
    description: string;
}

export const UsecaseHeader = ({title, description}: Props) => {
    return (
        <Card className={"flex flex-col mt-12 mb-8 p-8 gap-12 bg-black text-white"}>
            <div className={`text-5xl font-semibold`}>
                {title}
            </div>
            <p className={"max-w-xl text-sm text-gray-300"}>
                {description}
            </p>
        </Card>
    )
}
