import React from "react";
import {Accordion, AccordionItem, Avatar, Card, CardBody, CardHeader} from "@nextui-org/react";
import Ticker from 'react-ticker'

type Props = {
    data: {
        title: string;
        description: string;
        image: string;
        examples: {
            title: string;
            description: string;
            link: string;
        }[];
    }[]
}

export const UsecaseExamples = ({data}: Props) => {
    return (
        <Ticker>
            {() => (
                <div className={"grid md:grid-cols-4 lg:grid-cols-8 gap-4 w-[200vw] pt-20 pb-20"}
                     style={{
                         background: `linear-gradient(180deg,#fff,#f2f2f2 65.62%)`
                     }}
                >
                    {
                        data.map((usecase, index) => (
                            <Card className={"h-[400px]"}
                                  style={{
                                      background: `linear-gradient(0deg,#fff,#f2f2f2 65.62%)`
                                  }}
                            >
                                <CardHeader className={"flex flex-col gap-4 items-start"}>
                                    {/*<Avatar*/}
                                    {/*    isBordered*/}
                                    {/*    color="primary"*/}
                                    {/*    radius="md"*/}
                                    {/*    size={"sm"}*/}
                                    {/*    src={usecase.image}*/}
                                    {/*/>*/}
                                    <span className={"text-4xl font-semibold"}>
                                        {usecase.title}
                                    </span>
                                </CardHeader>
                                <CardBody className={"text-tiny text-gray-500"}>
                                    {usecase.description}
                                </CardBody>
                            </Card>
                        ))
                    }
                </div>
            )}
        </Ticker>
    )
}
