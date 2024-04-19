import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";


type Props = {
    repoUrl: string;
    repoDescription: string;
    lastUpdated: string;
}

export const GithubRepoEmbed = ({repoUrl, repoDescription, lastUpdated}: Props) => {
    return (
        <Card className="w-full">
            <div className={"flex flex-row"}>
                <CardHeader className="flex gap-3 w-1/4 items-start">
                    <Image
                        alt="github logo"
                        height={40}
                        radius="sm"
                        src="/provider-icons/github.svg"
                        width={40}
                    />
                    <div className="flex flex-col">
                        <p className="text-md p-0">Github</p>
                        <p className="text-small text-default-500 p-0 m-0">unbody.io</p>
                    </div>
                </CardHeader>

                <CardBody>
                    <p className={"text-sm text-gray-500"}>
                        {repoDescription}
                    </p>
                    <small>
                        {lastUpdated}
                    </small>
                </CardBody>
            </div>
            <Divider/>
            <CardFooter>
                <Link
                    isExternal
                    showAnchorIcon
                    href={repoUrl}
                >
                    Visit source code on GitHub.
                </Link>
            </CardFooter>
        </Card>
    );
}
