import React from "react";
import {Accordion, AccordionItem, Avatar} from "@nextui-org/react";

type Props = {
    data: {
        title: string;
        description: string;
        learnmore: string;
    }[]
}

export const UsecaseFeatures = ({data}: Props) => {
    return (
        <Accordion variant="splitted" isCompact={true}>
            {
                data.map((usecase, index) => (
                    <AccordionItem
                        key={index}
                        aria-label="Chung Miller"
                        startContent={
                            <Avatar
                                isBordered
                                color="primary"
                                radius="lg"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            />
                        }
                        subtitle="4 unread messages"
                        title="Chung Miller"
                    >
                        <div className={"flex flex-col mt-12 mb-16 justify-items-center items-center text-center"}>
                            <div className={`p-4 lg:p-8 text-7xl font-semibold text-center`}>
                                {usecase.title}
                            </div>
                            <p className={"max-w-lg text-medium"}>
                                {usecase.description}
                            </p>
                        </div>
                    </AccordionItem>
                ))
            }
        </Accordion>
    )
}
