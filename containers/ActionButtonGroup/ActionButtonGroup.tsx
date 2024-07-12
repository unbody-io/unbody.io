import * as React from "react";

import styles from "./ActionButtonGroup.module.css";
import Link from "next/link";
import {isValidLink} from "../../lib/utils";
import {PropsWithChildren} from "react";
import {useTheme} from "next-themes";

interface Props {
    learnMoreLink?: string;
    learnMoreAlt?: string;
    ctaLink?: string;
    ctaAlt?: string;
}

export const LinkButton = ({
                               children,
                               outlined = false,
                               href,
                               size = "normal",
                               className = ""
                           }: PropsWithChildren<{ href: string; outlined?: boolean, size?: "small" | "normal", className?: string}>) => {

    const {theme} = useTheme();
    const isDark = theme === "dark";

    const bW = size === "small" ? "w-32" : "w-56";
    const bH = size === "small" ? "h-8" : "h-12";

    const arrowSize = size === "small" ? "w-6 h-6" : "w-11 h-11";

    const bsf = size === "small" ? "text-xs" : "text-base";

    const baseHoverClassNames =
        "transition-all duration-300 hover:scale-105 hover:shadow-lg";
    const baseClassNames = `${baseHoverClassNames} p-0.5 cursor-pointer rounded-full  ${bW} ${bH} ${bsf} self-center flex flex-row items-center justify-between`;
    const extraClassNames = outlined
        ? `border-neutral-500 ${isDark?"bg-zinc-900":"bg-zinc-100"} shadow-lg shadow-indigo-100/20`
        : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white";

    const arrowBaseClassNames = `${baseHoverClassNames} transition-all duration-300 ${arrowSize} rounded-full flex justify-center items-center`;
    const arrowExtraClassNames = outlined
        ? !isDark? "bg-gray-100 text-gray-100" : "bg-gray-100 text-gray-800"
        : isDark? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800";

    return (
        <Link href={href} className={`${baseClassNames} ${extraClassNames} ${className}`}>
            <span className="pl-4">{children}</span>
            <div className={`${arrowBaseClassNames} ${arrowExtraClassNames}`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                >
                    <g>
                        <path
                            d="M7.13782 4.15002C7.33785 3.94999 7.66215 3.94999 7.86218 4.15002L10.85 7.13782C10.946 7.23388 11 7.36416 11 7.5C11 7.63584 10.946 7.76612 10.85 7.86218L7.86218 10.85C7.66215 11.05 7.33785 11.05 7.13782 10.85C6.9378 10.65 6.9378 10.3257 7.13782 10.1256L9.25126 8.01219H4.5122C4.22932 8.01219 4 7.78288 4 7.5C4 7.21712 4.22932 6.9878 4.5122 6.9878H9.25126L7.13782 4.87437C6.9378 4.67435 6.9378 4.35004 7.13782 4.15002Z"
                            fill={isDark? "white" : "black"}
                        />
                    </g>
                </svg>
            </div>
        </Link>
    );
};

export const ActionButtonGroup: React.FC<Props> = (props) => {
    const {learnMoreLink, learnMoreAlt = "", ctaAlt, ctaLink} = props;
    return (
        <div className={styles.actionButtonGroup}>
            <LinkButton href={ctaLink || "https://app.unbody.io"}
                        className={"md:flex"}
            >
                {ctaAlt || "Get started"}
            </LinkButton>
            {
                learnMoreLink && isValidLink(learnMoreLink) ?
                    <LinkButton href={learnMoreLink}
                                outlined={true}
                                className={"!hidden md:flex"}
                    >
                        {learnMoreAlt || "Learn more"}
                    </LinkButton>
                    :
                    null
                    // <LinkButton href={"https://cal.com/unbody"} outlined={true}>
                    //     Book a live demo!
                    // </LinkButton>
            }
        </div>
    );
};

export default ActionButtonGroup;
