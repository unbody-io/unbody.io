import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Avatar} from "@nextui-org/react";
import {AvatarGroup} from "@nextui-org/avatar";

type Props = {
    defaultSelectedKeys?: string[];
    onSelectionChange?: (selectedKeys: Set<string>) => void;
    options: { key: string, label: string, subLabel?:string, icons?: string[], disabled?: boolean}[];
    selectionMode?: "single" | "multiple";
    label?: string;
}

export const DropDown = (props: Props) => {
    const {selectionMode = "single"} = props;
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([...props.defaultSelectedKeys ?? []]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).map(key => props.options.find(option => option.key === key)),
        [selectedKeys]
    );

    console.log(selectedValue);

    const handleSelectionChange = (selectedKeys: Set<string>) => {
        const availableKeys = Array.from(selectedKeys).filter(key => {
            return !props.options.find(option => option.key === key)?.disabled;
        });
        setSelectedKeys(new Set(availableKeys));
        props.onSelectionChange?.(new Set(availableKeys));
    }

    return (
        <div className={"flex flex-col gap-2"}>
            {
                props.label && (
                    <label className={"uppercase text-tiny text-gray-500"}>
                        {props.label}
                    </label>
                )
            }
            <Dropdown       showArrow
                            radius="sm"
                            className={"w-full"}
            >
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                        className="capitalize w-full text-align-left"
                        disableRipple={true}
                    >
                        {
                            selectionMode === "single"?
                                <div className={"flex flex-row gap-1 items-center justify-center"}>
                                    <Avatar src={selectedValue[0]?.icons?.[0]}
                                            size={"sm"}
                                            radius={"sm"}
                                            isBordered={false}
                                            classNames={{
                                                base: "bg-white p-0.5 w-[25px] h-[25px]",
                                                icon: "text-black/80",
                                            }}
                                    />
                                    <span className={"ml-2 text-sm"}>
                                        {selectedValue[0]?.label}
                                    </span>
                                </div>
                                :

                                <AvatarGroup>
                                    {
                                        selectedValue.map((option, index) => (
                                            <Avatar key={index}
                                                    src={option.icons?.[0]}
                                                    size={"sm"}
                                                    radius={"sm"}
                                                    isBordered={false}
                                                    name={option.label}
                                                    classNames={{
                                                        base: "bg-white p-0.5 w-[25px] h-[25px]",
                                                        icon: "text-black/80",
                                                    }}
                                            />
                                        ))
                                    }
                                </AvatarGroup>
                        }
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    className={"w-full"}
                    variant="flat"
                    closeOnSelect={selectionMode === "single"}
                    disallowEmptySelection
                    selectionMode={selectionMode}
                    selectedKeys={selectedKeys}
                    onSelectionChange={handleSelectionChange}
                >
                    {
                        props.options.map((option) => (
                            <DropdownItem key={option.key}
                                          startContent={(
                                              <AvatarGroup size={"sm"}>
                                                  {
                                                      option.icons?.map((icon, index) => (
                                                          <Avatar key={index}
                                                                  src={icon}
                                                                  size={"sm"}
                                                                  radius={"full"}
                                                                  isBordered={true}
                                                                  isDisabled={option.disabled}
                                                                  name={option.label}
                                                                  classNames={{
                                                                      base: "bg-white p-0.5 w-[25px] h-[25px]",
                                                                      icon: "text-black/80",
                                                                  }}
                                                          />
                                                      ))
                                                  }
                                              </AvatarGroup>
                                          )}
                                          style={{
                                              opacity: option.disabled ? 0.5 : 1,
                                          }}
                            >
                                <div className={"flex flex-col pl-3"}>
                                    <span>
                                        {option.label}
                                    </span>
                                    {
                                        option.subLabel && (
                                            <span className={"text-xs text-gray-300"}>
                                                {option.subLabel}
                                            </span>
                                        )
                                    }
                                </div>
                            </DropdownItem>
                        ))
                    }
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
