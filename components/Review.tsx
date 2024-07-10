import {Avatar, Card, CardBody, CardFooter, CardHeader} from "@nextui-org/react";

type Props = {
    name: string;
    title: string;
    image: string;
    source: string;
    review: string;
}

export const Review = ({name, source, review, title, image}: Props) => {
    return (
        <Card className="max-w-[340px]">
            <CardHeader className="justify-between mb-2">
                <div className="flex gap-5">
                    <Avatar isBordered radius="full" size="md"
                            src={image}
                    />
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">
                            {name}
                        </h4>
                        <h5 className="text-small tracking-tight text-default-400">
                            {title}
                        </h5>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
                <p>
                    "{review}"
                </p>
            </CardBody>
            <CardFooter className="gap-3">
                <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">
                        P
                    </p>
                </div>
                <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">
                        {source}
                    </p>
                </div>
            </CardFooter>
        </Card>
    )
}
