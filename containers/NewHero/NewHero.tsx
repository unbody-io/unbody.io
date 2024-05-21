import * as React from "react";

import styles from "./Hero.module.css";
import {HTMLProps, useEffect, useRef, useState} from "react";
import Image from "next/image";
import {
    FrameItem,
    heroFrames,
    ProviderItem,
    providersInDeck,
} from "../../lib/hero.config";
import {mapRange} from "../../lib/utils";
import ActionButtonGroup from "../ActionButtonGroup/ActionButtonGroup";
import {SITE_DESCRIPTION} from "../../lib/app.config";
import {useTheme} from "next-themes";

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
    active: boolean;
    opacityForce?: number;
};
const ProviderIcon = (props: ProviderIconProps) => (
    <div
        className={`transition-all duration-300 h-16 w-16 bg-[url('/provider-border.svg')] rounded-xl items-center flex justify-center 
      ${!props.active ? "opacity-20" : ""}`}
        style={{
            opacity: props.active ? 1 : props.opacityForce ?? 0.2,
        }}
    >
        <img
            className="w-[40px] h-[40px]"
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
            <div className={styles.mockup}>
                <img className="object-cover" src={frame.mockup} alt={frame.key}/>
            </div>
            <div className={styles.snippet}>
                <img className="object-fill" src={frame.snippetCode} alt={frame.key}/>
            </div>
        </div>
    </div>
);

interface ProviderDeckProps {
    activeFrame: FrameItem;
}

const ProviderDeck = ({activeFrame}: ProviderDeckProps) => {
    const calcOpacity = (index: number) => {
        const middleIndex = Math.floor(providersInDeck.length / 2);
        const distance = Math.abs(index - middleIndex);
        return mapRange(distance, 0, middleIndex, 0.25, 0);
    };

    return (
        <div className={styles.providersDeckWrapper}>
            <div className={styles.providersDeck}>
                {providersInDeck.map((provider: ProviderItem, index) => (
                    <ProviderIcon
                        provider={provider}
                        key={`${provider.name}-${index}`}
                        active={
                            activeFrame.providers.findIndex(
                                (p) => p.name === provider.name
                            ) !== -1
                        }
                        opacityForce={calcOpacity(index)}
                    />
                ))}
            </div>
        </div>
    );
};

interface FrameDeckProps {
    activeFrame: FrameItem;
}

const FrameDeck = ({activeFrame}: FrameDeckProps) => (
    <div className={`${styles.framesContainer} ${styles["mode1"]}`}>
        {heroFrames.map((frame, index) => (
            <Frame
                frame={frame}
                key={`${frame.key}-index`}
                active={activeFrame.key === frame.key}
            />
        ))}
    </div>
);

const useActiveFrame = () => {
    const [activeFrameIndex, setActiveFrameIndex] = useState(0);

    useInterval(() => {
        setActiveFrameIndex((activeFrameIndex + 1) % heroFrames.length);
    }, 5000);

    return heroFrames[activeFrameIndex];
};

const HeroText = () => {

    const typographyClasses = "text-5xl text-center md:text-left md:tacking-[0.96px] tracking-[0.8px] md:leading-[115%] leading-[115%] font-semibold";

    return (
        <div
            className={`${styles.heroText} w-full md:h-full mt-[-30px] md:mt-0 flex flex-col gap-1 md:gap-4 justify-center text-4xl md:text-5xl`}
        >
            <div className={typographyClasses}>
                <span className="">
                    <span>
                        The Only API You Need to Build&nbsp;
                    </span>
                    <span className={styles.gradientText}>AI-Native</span>
                    <span>
                        &nbsp;Apps
                    </span>
                </span>

            </div>
            <p className="text-paraghraph_gray text-base leading-6 hidden md:block">
                {SITE_DESCRIPTION}
            </p>
            <div className="hidden md:block">
                <ActionButtonGroup ctaLink={"/docs/get-started"}/>
            </div>
            <div className="block md:hidden m-auto p-4">
                <ActionButtonGroup ctaLink={"/docs/get-started"}/>
            </div>
        </div>
    );
};

const Scene = () => {
    const activeFrame = useActiveFrame();
    return (
        <div className={`${styles.scene}`}>
            <HeroText/>
            <ProviderDeck activeFrame={activeFrame}/>
            <div className="object-center mt-[140px] w-20 h-20 hidden md:block">
                <Image src="/Line.png" height={277} width={124} alt="line"/>
            </div>
            <FrameDeck activeFrame={activeFrame}/>
        </div>
    );
};

const NewHero: React.FC<Props> = (props) => {
    const {theme}  = useTheme();
    const mode = theme === "dark" ? "dark" : "light";
    return (
        <div className={`${styles.hero} ${styles[mode]}`}>
            <div className={styles.heroShadesLayer}>
                <div className={styles.gradH}/>
                <div className={styles.gradBt}/>
            </div>
            <Scene/>
        </div>
    );
};

export default NewHero;
