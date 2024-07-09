import React, {useEffect, useState} from "react";
import clsx from "clsx";
import {DropDown} from "./DropDown";
import {Tab, Tabs} from "@nextui-org/tabs";
import {codeToHtml} from 'shiki'
import 'react18-json-view/src/style.css'

import {
    Accordion, AccordionItem,
    Button,
    Card,
    CardBody,
    Dropdown as NuiDropDown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger
} from "@nextui-org/react";

import {Textarea} from "@nextui-org/input";
import {useApiPost} from "../lib/api.service";
import {CircularProgress, Progress} from "@nextui-org/progress";
import {
    demoPresets, demoSourceTypes,
    generateCodeString,
    InputData,
    INPUTS_CODE,
    Method,
    MethodCategory,
    MethodCategoryName,
    methodsCategories,
    Presets,
    SourceTypes, UNBODY_CLIENT_CODE
} from "../lib/demo.service";

import {CollapsibleCodeSnippet} from "./CollapsibleCodeSnippet";
import JsonView from "react18-json-view";

export const LiveDemo = () => {
    const [selectedPreset, setSelectedPreset] = useState<Presets>(demoPresets[0]);
    const [selectedSourceTypes, setSelectedSourceTypes] = useState<SourceTypes[]>([SourceTypes.GoogleDoc]);
    const execApi = useApiPost<any, any>('/api/exec', false)
    const [hasChanged, setHasChanged] = useState<boolean>(true);

    const [input, setInput] = useState<InputData>({
        query: "A movie director",
        prompt: "Explain why these information are related to each other.",
        text: "CBT",
        remoteId: "1davFgs_Q1avtnUUevqXBaylz42N8uk8kZiaAhiYlSb8",
        path: "/path/to",
    });

    const [code, setCode] = useState<string>("loading...");

    const [methodCategory, setMethodCategory] = useState<MethodCategory>(methodsCategories[0]);
    const [method, setSelectedMethod] = useState<Method>(methodCategory.methods[0]);

    const handleAIModelChange = (selected: Set<string>) => {
        setSelectedPreset(demoPresets.find((model) => model.key === Array.from(selected)[0]) || demoPresets[0]);
    };

    const handleSourceTypeChange = (selected: Set<string>) => {
        setSelectedSourceTypes(Array.from(selected) as SourceTypes[]);
    };

    const handleMethodChange = (selected: Set<string>) => {
        const m = methodCategory.methods.find((method) => method.key === Array.from(selected)[0]);
        setSelectedMethod(m || methodCategory.methods[0]);
    };

    const handleMethodCategoryChange = (catKey: string) => {
        const category = methodsCategories.find((category) => category.key === catKey);
        setMethodCategory(category);
        setSelectedMethod(category.methods[0]);
    }


    const execute = () => {
        execApi.exec({
            presetKey: selectedPreset.key,
            methodKey: method.key,
            sourceTypes: selectedSourceTypes,
            input,
        });
        setHasChanged(false)
    }

    useEffect(() => {
        setCode("Loading...");
        const codeSnippet = generateCodeString(
            selectedSourceTypes,
            input,
            method
        );
        codeToHtml(codeSnippet, {
            lang: 'javascript',
            theme: 'min-light',
            mergeWhitespaces: true,
        }).then((html) => {
            setCode(html);
        });
        setHasChanged(true);
    }, [selectedPreset, selectedSourceTypes, method, methodCategory, input]);

    const isQueryRequired = method.args.includes("query");
    const isPromptRequired = method.args.includes("prompt");

    return (
        <div className={clsx(
            "flex flex-col gap-4",
            "rounded-xl p-4",
            "nx-min-h-[calc(100vh-var(--nextra-navbar-height))]"
        )}>
            <div className={"grid grid-cols-12 gap-4 w-full"}>
                <div className={"col-span-2"}>
                    <DropDown options={demoPresets}
                              defaultSelectedKeys={[demoPresets[0].key]}
                              label={"AI Model"}
                              onSelectionChange={handleAIModelChange}
                    />
                </div>
                <div className={"col-span-2"}>
                    <DropDown options={demoSourceTypes
                        .sort((sourceType) => (
                            sourceType.disabled ? 1 : -1
                        ))
                        .map((sourceType) => ({
                            key: sourceType.sourceType as string,
                            label: sourceType.label,
                            subLabel: sourceType.subLabel,
                            disabled: sourceType.disabled,
                            icons: [sourceType.icon]
                        }))}
                              selectionMode={"multiple"}
                              defaultSelectedKeys={[SourceTypes.GoogleDoc]}
                              label={"Source Types"}
                              onSelectionChange={handleSourceTypeChange}
                    />
                </div>
                <div className={"col-span-5 flex flex-row gap-4"}>
                    <div className={"flex flex-col gap-2"}>
                        <label className={"text-gray-500 text-tiny uppercase"}>
                            Use Case
                        </label>
                        <Tabs onSelectionChange={handleMethodCategoryChange}>
                            {
                                methodsCategories.map(({category}) => (
                                    <Tab key={category}
                                         title={category}
                                    />
                                ))
                            }
                        </Tabs>
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <label className={"text-gray-500 text-tiny uppercase"}>
                            Method
                        </label>
                        <NuiDropDown>
                            <DropdownTrigger>
                                <Button className={"bg-gray-100"}>
                                    {method.key}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu onSelectionChange={handleMethodChange}
                                          selectedKeys={[method.key]}
                                          selectionMode={"single"}
                            >
                                {
                                    methodCategory
                                        .methods
                                        .map((method) => (
                                            <DropdownItem key={method.key}>
                                                {method.key}
                                            </DropdownItem>
                                        ))
                                }
                            </DropdownMenu>
                        </NuiDropDown>
                    </div>
                </div>
                <div className={"col-start-12 col-end-13 flex flex-row gap-4 items-end"}>
                    <Button onClick={execute}
                            disabled={!hasChanged}
                            className={clsx(
                                `cursor-${hasChanged ? "pointer" : "not-allowed"} w-full min-w-1.5`,
                                `${hasChanged? "!bg-primary": "!bg-gray-200"}`,
                                "!text-white !hover:!bg-primary-dark !hover:!text-white",
                            )}
                    >
                        Run
                    </Button>
                </div>

            </div>
            <div className={"grid grid-cols-12"}>
                <Accordion variant={"shadow"}
                           className={"w-full col-span-12 outline-none"}
                           isCompact={true}
                >
                    <AccordionItem title={"Inputs"}
                                   key={1}
                    >
                        <div className={"w-full grid grid-cols-12 py-4 gap-4"}>
                            {
                                isQueryRequired && (
                                    <Textarea label={"Query"}
                                              className={clsx(
                                                  "col-span-4",
                                              )}
                                              value={input.query}
                                              onChange={(e) => setInput({...input, query: e.target.value || ""})}
                                    />
                                )
                            }
                            {
                                isPromptRequired && (
                                    <Textarea label={"Prompt"}
                                              className={clsx(
                                                  "col-span-4",
                                              )}
                                              value={input.prompt}
                                              onChange={(e) => setInput({...input, prompt: e.target.value || ""})}
                                    />
                                )
                            }
                        </div>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className={"grid grid-cols-12 gap-4 w-full h-full"}>
                <Card className={"col-span-6"}>
                    <CardBody className={"flex flex-col gap-2"}>
                        <CollapsibleCodeSnippet title={"// Unbody Client"}
                                                code={UNBODY_CLIENT_CODE(input).trim()}
                        />
                        <CollapsibleCodeSnippet title={"// Inputs"}
                                                code={INPUTS_CODE({
                                                    query: isQueryRequired ? input.query : null,
                                                    prompt: isPromptRequired ? input.prompt : null,
                                                }).trim()}
                        />
                        <div dangerouslySetInnerHTML={{
                            __html: code
                        }}
                             className={"rounded-xl overflow-hidden"}
                        />
                    </CardBody>
                </Card>
                <Card className={"col-span-6"}>
                    <CardBody>
                        {
                            execApi.isLoading && (
                                <div className={"p-6 flex items-center justify-center"}>
                                    <CircularProgress label={"Calling the API"}/>
                                </div>
                            )
                        }
                        {
                            execApi.error && (
                                <div>
                                    <div>Error calling the API</div>
                                </div>
                            )
                        }
                        {
                            execApi.data && (
                                <div style={{
                                    maxHeight: "80vh",
                                    height: "60vh",
                                }}
                                     className={"text-sm"}
                                >
                                    <JsonView src={execApi.data.data}
                                              theme={"winter-is-coming"}
                                              enableClipboard={false}
                                              collapseStringsAfterLength={300}
                                    />
                                </div>
                            )
                        }
                        {
                            !execApi.isLoading && !execApi.error && !execApi.data && (
                                <div>
                                    <div>API Response</div>
                                    <div>No response yet</div>
                                </div>
                            )
                        }
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};
