import {Accordion, AccordionItem} from "@nextui-org/react";
import React, {ReactNode, useEffect} from "react";
import {codeToHtml} from "shiki";

type Props = {
    title: string|ReactNode
    code: string
}

export const CollapsibleCodeSnippet = (props: Props) => {
    const [formattedCode, setFormattedCode] = React.useState<string>("")
    const [isCollapsed, setIsCollapsed] = React.useState<boolean>(true)

    useEffect( () => {
        codeToHtml(props.code, {
            lang: 'javascript',
            theme: 'min-light',
            mergeWhitespaces: true,
        }).then((html) => {setFormattedCode(html)});
    }, [props.code])

    return (
        <Accordion isCompact={true}
                   style={{
                       background: `hsl(var(--nextra-primary-hue)var(--nextra-primary-saturation)39%/.05)`
                   }}
                   className={"rounded-xl overflow-hidden"}
                   onSelectionChange={() => setIsCollapsed(!isCollapsed)}
        >
            <AccordionItem title={(
                <div className={"custom-code-block text-gray-500"}>
                    {props.title}
                </div>
            )}
                           indicator={() => <div></div>}
                           startContent={(
                               <div className={"border-1 p-2 flex items-center justify-center rounded-sm"}
                                    style={{
                                        width: "10px",
                                        height: "10px",
                                    }}
                               >
                                                   <span>
                                                         {isCollapsed ? "-" : "+"}
                                                   </span>
                               </div>
                           )}
            >
                <div dangerouslySetInnerHTML={{
                    __html: formattedCode
                }}
                     className={"rounded-xl overflow-hidden custom-code-block-wrapper"}
                />
            </AccordionItem>
        </Accordion>
    )
}
