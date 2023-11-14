import * as React from "react";

import styles from "./ActionButtonGroup.module.css";
import Link from "next/link";
import { isValidLink } from "../../lib/utils";
import { PropsWithChildren } from "react";

interface Props {
  learnMoreLink: string;
  learnMoreAlt?: string;
}

export const LinkButton = ({
  children,
  outlined = false,
  href,
}: PropsWithChildren<{ href: string; outlined?: boolean }>) => {
  const baseHoverClassNames =
    "transition-all duration-300 hover:scale-105 hover:shadow-lg";
  const baseClassNames = `${baseHoverClassNames} p-0.5 cursor-pointer rounded-full  w-40 h-12 text-xs self-center flex flex-row items-center justify-between`;
  const extraClassNames = outlined
    ? "text-white border-neutral-500 bg-indigo-10 shadow-lg shadow-indigo-100/10"
    : "bg-white text-gray-800";

  const arrowBaseClassNames = `${baseHoverClassNames} transition-all duration-300  w-11 h-11 rounded-full flex justify-center items-center`;
  const arrowExtraClassNames = outlined
    ? "text-gray-800"
    : "bg-gray-800 text-white-100";

  return (
    <Link href={href} className={`${baseClassNames} ${extraClassNames}`}>
      <span className="pl-4">{children}</span>
      <div className={`${arrowBaseClassNames} ${arrowExtraClassNames}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
        >
          <g clipPath="url(#clip0_412_580)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.13782 4.15002C7.33785 3.94999 7.66215 3.94999 7.86218 4.15002L10.85 7.13782C10.946 7.23388 11 7.36416 11 7.5C11 7.63584 10.946 7.76612 10.85 7.86218L7.86218 10.85C7.66215 11.05 7.33785 11.05 7.13782 10.85C6.9378 10.65 6.9378 10.3257 7.13782 10.1256L9.25126 8.01219H4.5122C4.22932 8.01219 4 7.78288 4 7.5C4 7.21712 4.22932 6.9878 4.5122 6.9878H9.25126L7.13782 4.87437C6.9378 4.67435 6.9378 4.35004 7.13782 4.15002Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_412_580">
              <rect width="15" height="15" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </Link>
  );
};

export const ActionButtonGroup: React.FC<Props> = (props) => {
  const { learnMoreLink, learnMoreAlt = "" } = props;
  return (
    <div className={styles.actionButtonGroup}>
      <LinkButton href={"https://app.unbody.io"}>Get started</LinkButton>
      <LinkButton href={"https://forms.gle/s4EsTppoE7dZS8hC8"} outlined={true}>
        Get in touch
      </LinkButton>
    </div>
  );
};

export default ActionButtonGroup;
