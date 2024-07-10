import * as React from "react";

import styles from "./Hero.module.css";
import {HTMLProps, PropsWithChildren, useEffect, useRef, useState} from "react";
import Image from "next/image";

import {
    AIProviders,
    FrameItem,
    heroFrames,
    ProviderItem,
    providersInDeck,
} from "../../lib/hero.config";
import ActionButtonGroup from "../ActionButtonGroup/ActionButtonGroup";
import {SITE_DESCRIPTION} from "../../lib/app.config";
import {useTheme} from "next-themes";
import {Marquee} from "../../components/Marquee";
import clsx from "clsx";
import {TypeAnimation} from "react-type-animation";

interface Props {
}

function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef<() => void>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            if (savedCallback.current) {
                savedCallback.current();
            }
        }

        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

type ProviderIconProps = {
    provider: ProviderItem;
};
const ProviderIcon = (props: ProviderIconProps) => (
    <div
        className={clsx(
            `transition-all duration-300 h-16 w-16 bg-[url('/provider-border.svg')] rounded-xl items-center flex justify-center`,
            `scale-80`
        )}>
        <img
            className="w-[40px] h-auto"
            src={props.provider.image}
            alt={props.provider.name}
        />
    </div>
);

const Frame = ({
                   frame,
                   active,
                   className,
                   ...rest
               }: { frame: FrameItem; active: boolean } & HTMLProps<HTMLDivElement>) => (
    <div
        className={`${styles.frame} ${active ? styles.activeFrame : ""}`}
        {...rest}
    >
        <div className="flex flex-col">
            <div className={styles.snippet}>
                <img className="object-fill" src={frame.snippetCode} alt={frame.key}/>
            </div>
        </div>
    </div>
);

interface ProviderDeckProps {
    providers: ProviderItem[];
    className: string;
}

const useWindowWidth = () => {
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
}

const ProviderDeck = ({providers, className = "h-full"}: ProviderDeckProps) => {
    const width = useWindowWidth();
    const isMobile = width < 768;
    const gradThreshold = isMobile ? 10 : 50;

    return (
        <div className={clsx(
            `border-none md:border-dotted md:border-2 border-gray-300 rounded-xl`,
            `p-4 md:p-1 xl:p-4`,
            "flex",
            "justify-center items-center",
        )}>
            <div style={{
                maskImage: `linear-gradient(to ${isMobile ? "left" : "bottom"}, transparent 0%, rgba(0, 11, 0, 1.0) ${gradThreshold}%, rgba(0, 0, 0, 1.0) ${gradThreshold}%, transparent 100%)`,
                overflow: "hidden",
            }}
                 className={clsx(
                     className,
                     "flex",
                     "justify-center items-center",
                 )}
            >
                <Marquee
                    direction={isMobile ? "left" : "up"}
                    className={isMobile ? "w-[100vw]" : "h-[100vh]"}
                >
                    {
                        providers.map((provider: ProviderItem, index) => (
                            <ProviderIcon
                                provider={provider}
                                key={`${provider.name}-${index}`}
                            />
                        ))
                    }
                </Marquee>
            </div>
        </div>
    )
};

interface FrameDeckProps {
    activeFrame: FrameItem;
}

const HeroText = () => {
    const typographyClasses = "text-4xl md:text-5xl text-left md:tacking-[0.96px] tracking-[0.8px] md:leading-[115%] leading-[130%] font-semibold";
    return (
        <div className={"text-balance mb-4 md:mb-0"}>
            <div className={clsx(
                typographyClasses,
                `py-8 md:py-0`,
                `flex`
            )}>
                <span className="">
                    <span>
                        Any Data,&nbsp;
                    </span>
                    <br className={"md:hidden"}/>
                    <span>
                       Any <span className={styles.gradientText}>AI</span>,
                    </span>
                    <br/>
                    <span>
                        <span className={styles.gradientText}>One</span> API,
                    </span>
                    <br/>
                    <span>
                        <span className={styles.gradientText}>One</span> Line of Code
                    </span>
                </span>

            </div>
            <p className="text-paraghraph_gray text-base hidden md:block py-6">
                {SITE_DESCRIPTION}
            </p>
            <div className="flex w-full justify-center md:justify-start">
                <ActionButtonGroup ctaLink={"/docs/get-started"}
                                   learnMoreLink={"/demo"}
                                   learnMoreAlt={"Try live demo"}
                />
            </div>
        </div>
    );
};


const LineConnection = () => (
    <div className={clsx(
        "items-center flex-row gap-0",
        "hidden md:flex",
    )}
         style={{
             transform: `translateX(-8px)`,
             marginRight: "-16px",
         }}
    >
        <div style={{
            width: "15px",
            height: "15px",
            borderRadius: "50%",
            backgroundImage: `url(/icons/play.svg)`,
        }}
             className={"hide bg-white border-gray-300 border-1 border-dashed"}
        />
        <div className={clsx(
            `w-8 xl:w-16`,
            `h-[1px]`,
            `border-dashed border-t-1 border-gray-300`,
        )}/>
        <div style={{
            width: "15px",
            height: "15px",
            borderRadius: "50%"
        }}
             className={"bg-white border-gray-300 border-1 border-dashed"}
        />
    </div>
)

const TypeAnimationComponent = ({sequence, color}) => (
    <TypeAnimation
        sequence={sequence}
        wrapper={"div"}
        cursor={false}
        repeat={Infinity}
        style={{
            fontFamily: "monospace",
            display: 'inline-block',
            color: color || 'white',
            whiteSpace: "pre-wrap"
        }}
    />
);

const CodeSnippet = (props: PropsWithChildren<any>) =>
(
    <div className={clsx(
        `rounded-2xl bg-gray-800 p-4`,
        `w-full`,
        `shadow-xl`,
        `color-gray-100`,
    )}>
        <div className={"relative w-full h-[20px] flex flex-row gap-2"}>
            <div className={"rounded-full bg-gray-600"} style={{width: "12px", height: "12px"}}/>
            <div className={"rounded-full bg-gray-600"} style={{width: "12px", height: "12px"}}/>
            <div className={"rounded-full bg-gray-600"} style={{width: "12px", height: "12px"}}/>
        </div>
        <div className={"p-2"}>
            {props.children}
        </div>
    </div>
)
const NewHero: React.FC<Props> = (props) => {
    const {theme} = useTheme();
    const mode = theme === "dark" ? "dark" : "light";

    const windowWidth = useWindowWidth();
    const providerDeckSize = windowWidth < 768 ? 'w-1/2' : 'h-[70vh]';
    const dataSourceDeckSize = windowWidth < 768 ? 'w-full' : 'h-[80vh]';

    return (
        <div className={clsx(
            `md:grid md:grid-cols-12`,
            `items-center justify-center`,
        )}
             style={{
                 height: "calc(100vh - var(--nextra-navbar-height))"
             }}
        >
            <div className={"md:col-span-5"}>
                <HeroText/>
            </div>
            <div className={clsx(
                `md:col-start-6 xl:col-start-7 md:col-end-13`,
                `flex sm:flex-col md:flex-row`,
                `items-center`,
            )}>
                <div>
                    <ProviderDeck providers={providersInDeck}
                                  className={dataSourceDeckSize}
                    />
                </div>
                <LineConnection/>
                <div>
                    <ProviderDeck providers={AIProviders}
                                  className={providerDeckSize}
                    />
                </div>
                <LineConnection/>
                <div className={"w-full"}>
                    <CodeSnippet>
                        <TypeAnimationComponent
                            sequence={[
                                'unbody', 1000,
                                () => {
                                    console.log('Sequence completed');
                                },
                            ]}
                            color={"white"}
                        />
                        <br/>
                        <TypeAnimationComponent
                            sequence={[
                                '     .gdoc', 5000,
                                '     .', 100,
                                '     .textDocuments', 5000,
                                '     .', 100,
                                '     .videos', 5000,
                                '     .', 100,
                                '     .images', 5000,
                                '     .', 100,
                                '     .pdfs', 5000,
                                '     .', 100,
                                '     .spreadsheet', 5000,
                                '     .', 100,
                                '     .discordMassages', 5000,
                                '     .', 100,
                                '     .paragraphs', 5000,
                                '     .', 100,
                                '     .gCalendar', 5000,
                                '     .', 100,
                                '     .csv', 5000,
                                '     .', 100,
                                '     .json', 5000,
                                '     .', 100,
                                '     .audio', 5000,
                                '     .', 100,
                                () => {
                                    console.log('Sequence completed');
                                },
                            ]}
                            color={'lightYellow'}
                        />
                        <br/>
                        <TypeAnimationComponent
                            sequence={[
                                '     .search.about(...)', 2000,
                                '     .search', 100,
                                '     .search.hybrid(...)', 2000,
                                '     .search', 100,
                                '     .search.find(...)', 2000,
                                '     .', 100,
                                '     .similar.image(...)', 2000,
                                '     .', 100,
                                '     .similar.text(...)', 2000,
                                '     .', 100,
                                '     .similar.record(...)', 2000,
                                '     .', 100,
                                '     .rerank(...)', 2000,
                                '     .', 100,
                                '     .classify(...)', 2000,
                                () => {
                                    console.log('Sequence completed');
                                },
                            ]}
                            color={'lightBlue'}
                        />
                        <br/>
                        <TypeAnimationComponent
                            sequence={[
                                '     .sort(...)', 2000,
                                '     .', 100,
                                '     .limit(...)', 2000,
                                '     .', 100,
                                '     .groupBy(...)', 2000,
                                '     .', 100,
                                '     .where(...)', 2000,
                                '     .', 100,
                                '     .select(...)', 2000,
                                () => {
                                    console.log('Sequence completed');
                                },
                            ]}
                            color={'lightGreen'}
                        />
                        <br/>
                        <TypeAnimationComponent
                            sequence={[
                                '     .generate.fromMany(...)', 5000,
                                '     .', 100,
                                '     .generate', 100,
                                '     .', 100,
                                '     .generate.fromOne(...)', 5000,
                                '     .', 100,
                                '     .chat(...)', 5000,
                                '     .', 100,
                                '     .ask(...)', 5000,
                                '     .', 100,
                                '     .finetune(...)', 1000,
                                () => {
                                    console.log('Sequence completed');
                                },
                            ]}
                            color={'lightBlue'}
                        />
                    </CodeSnippet>
                </div>
            </div>


        </div>
    );
};

export default NewHero;
