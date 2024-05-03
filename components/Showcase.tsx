import React from "react";
import {IGoogleDoc} from "@unbody-io/ts-client";
import Image from "next/image";
import {Card, CardBody, CardHeader, Chip} from "@nextui-org/react";
import Link from "next/link";

type ProjectItem = {
    blocks: {
        text?: string;
        url?: string;
        tagName?: string;
        width?: number;
        height?: number;
    }[]
} & Pick<IGoogleDoc, "title" | "summary" | "autoKeywords" | "mentions">

type Props = {
    projects: ProjectItem[]
}

export const allowedKeywords = [
    "content-api",
    "headless-cms",
    "generative",
    "search",
    "ai-assistant",
    "chat-bot",
]

type HeaderProps = {
    onTagClicked: (tag: string) => void
    selectedTags: string[]
}

const ShowCaseHeader = ({selectedTags, onTagClicked}: HeaderProps) => {
    const noTagsSelected = selectedTags.length === 0;

    return (
        <div className={"text-center flex flex-col gap-2 pt-6 w-full justify-items-center"}>
            <div className={"text-4xl font-semibold"}>Showcase</div>
            <p>Open source projects powered by Unbody</p>
            <div className={"flex w-fit m-auto gap-1 mt-2"}>
                {
                    allowedKeywords.map((keyword, index) => (
                        <Chip key={index}
                              size={"sm"}
                              variant="shadow"
                              classNames={{
                                  base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30 hover:opacity-50 cursor-pointer transition-all hover:scale-105",
                                  content: "drop-shadow shadow-black text-white",
                              }}
                              onClick={() => onTagClicked(keyword)}
                              style={{
                                  opacity: noTagsSelected || selectedTags.includes(keyword) ? 1 : 0.5
                              }}
                        >
                            {keyword}
                        </Chip>
                    ))
                }
            </div>
        </div>
    )
}

export const ShowCaseGallery = ({projects}: Props) => {
    const [selectedTags, setSelectedTags] = React.useState<string[]>([])

    const handleTagClicked = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag))
        } else {
            setSelectedTags([...selectedTags, tag])
        }
    }

    const getProjectLink = (project: ProjectItem) => {
        const blockWithLink = project.blocks.find(({text}) => text && text.trim().startsWith("https://"));
        if (!blockWithLink) return null;
        return blockWithLink?.text.trim();
    }

    return (
        <>
            <ShowCaseHeader onTagClicked={handleTagClicked}
                            selectedTags={selectedTags}
            />
            <div className={"grid grid-cols-1 md:grid-cols-2 mt-16 gap-4"}>
                {
                    projects
                        .filter(({autoKeywords}) => {
                            if (selectedTags.length === 0) {
                                return true
                            }
                            return selectedTags.some(tag => (autoKeywords as string[]).includes(tag))
                        })
                        .map(({title, summary, blocks, autoKeywords, mentions}, index) => {
                            const image = blocks.find(({url}) => url && url);
                            const projectLink = getProjectLink({blocks, title, summary, autoKeywords, mentions})
                            return (
                                <Card className="py-4" key={index}>
                                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                        <div className="text-tiny uppercase font-bold mb-4">
                                            {
                                                (autoKeywords as string[])
                                                    .filter(keyword => allowedKeywords.includes(keyword))
                                                    .map((keyword, j) => (
                                                        <Chip key={j}
                                                              size={"sm"}
                                                              className="mr-1"
                                                              variant={"bordered"}
                                                        >
                                                            {keyword}
                                                        </Chip>
                                                    ))
                                            }
                                        </div>
                                        <div className="font-semibold text-2xl">
                                            {title as string}
                                        </div>
                                        <p className="text-tiny pb-6">
                                            {
                                                (mentions as any).map((mention, j) => (
                                                    <a key={j} href={mention.emailAddress}
                                                       className="text-default-500 hover:underline">
                                                        {mention.name}
                                                    </a>
                                                ))
                                            }
                                        </p>
                                        <p className="text-default-500 text-sm mb-6">
                                            {summary as string}
                                        </p>
                                    </CardHeader>
                                    <CardBody className="overflow-hidden"
                                              style={{
                                                  height: "300px",
                                                  width: "auto",
                                              }}
                                    >
                                        <Link href={projectLink||""}>
                                            <Image
                                                src={image?.url as string}
                                                alt={title as string}
                                                className="cursor-pointer rounded-3xl transition-all hover:scale-110 hover:shadow-inner"
                                                width={image?.width as number}
                                                height={image?.height as number}
                                                style={{
                                                    objectFit: "cover",
                                                    height: "100%",
                                                    width: "100%",
                                                }}
                                            />
                                        </Link>
                                    </CardBody>
                                </Card>
                            )
                        })
                }
            </div>
        </>
    )
}

