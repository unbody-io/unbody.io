import React from "react";
import {Card, CardHeader, CardBody, Avatar, Link} from "@nextui-org/react";

type Props = {
    title: string;
    icon?: string;
    description: string;
    link: string;
    iconSize?: string;
    style?: React.CSSProperties;
}

export const FeatureCard = (props: Props) => {
    return (
        <Link href={props.link} className={"w-full"}>
            <Card className={"p-4 w-full min-h-[180px] h-full transition-all hover:scale-105"}
                  style={{
                      background: `linear-gradient(180deg,#000,#888)`,
                      color: "#fff",
                      height: "380px",
                      ...(props.style || {})
                  }}
            >
                {
                    props.icon &&
                    <CardHeader>
                        <Avatar src={props.icon}
                                alt={props.title}
                                radius={"sm"}
                                className={"bg-transparent invert"}
                        />
                    </CardHeader>
                }

                <CardBody className={"flex flex-col gap-4"}>
                    <span className={"font-semibold text-4xl"}>{props.title}</span>
                    <p className={"text-gray-400 text-sm"}>{props.description}</p>
                </CardBody>
            </Card>
        </Link>

    )
}
