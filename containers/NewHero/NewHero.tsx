import * as React from "react";

import styles from "./Hero.module.css";
import { HTMLProps, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  FrameItem,
  heroFrames,
  ProviderItem,
  providersInDeck,
} from "../../lib/hero.config";
import { mapRange } from "../../lib/utils";
import ActionButtonGroup, {
  LinkButton,
} from "../ActionButtonGroup/ActionButtonGroup";

interface Props {}

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

const HeroScene = () => {};

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
        <img className="object-cover" src={frame.mockup} alt={frame.key} />
      </div>
      <div className={styles.snippet}>
        <img className="object-fill" src={frame.snippetCode} alt={frame.key} />
      </div>
    </div>
  </div>
);

interface ProviderDeckProps {
  activeFrame: FrameItem;
}

const dummyProvider: ProviderItem = {
  name: "Discord",
  image: "/Provider Icons/Discord.svg",
};

const ProviderDeck = ({ activeFrame }: ProviderDeckProps) => {
  const calcOpacity = (index: number) => {
    const middleIndex = Math.floor(providersInDeck.length / 2);
    const distance = Math.abs(index - middleIndex);
    return mapRange(distance, 0, middleIndex, 0.25, 0.05);
  };

  console.log(
    activeFrame.key,
    activeFrame.providers.map((p) => p.name)
  );

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

const FrameDeck = ({ activeFrame }: FrameDeckProps) => (
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
  return (
    <div
      className={`${styles.heroText} w-full md:h-full mt-[-30px] md:mt-0 flex flex-col gap-1 md:gap-4 justify-center text-4xl md:text-5xl`}
    >
      <span className="text-[40px] md:text-5xl  md:tacking-[0.96px] tracking-[0.8px] leading-[115%] font-semibold flex flex-row ">
        Build&nbsp;
        <span className="flex flex-row">
          <span className={styles.gradientText}>A.I.</span>
          <Image src="MagicIcon.svg" width={20} height={20} alt="Magical" />
        </span>
        <span>&nbsp;apps</span>
      </span>

      <span className="flex flex-row">
        <span className="text-[40px] md:text-5xl leading-[115%] font-semibold">
          with <span className={styles.gradientText}> your data,</span>
        </span>
      </span>
      <span className="text-[40px] md:text-5xl leading-[115%] font-semibold">
        no fuss.
      </span>
      <p className="text-paraghraph_gray text-base leading-6 hidden md:block">
        An invisible AI layer, a headless API designed to transform diverse
        content from any location or format into knowledge. Our aim is to enable
        developers at any level to build applications that understand our daily
        produced content, right out of box!
      </p>
      <div className="hidden md:block">
        <ActionButtonGroup
          learnMoreLink={`/docs`}
          learnMoreAlt={"Learn more"}
        />
      </div>
      <div className="block md:hidden m-auto p-4">
        <ActionButtonGroup
          learnMoreLink={`/docs`}
          learnMoreAlt={"Learn more"}
        />
      </div>
    </div>
  );
};

const Scene = () => {
  const activeFrame = useActiveFrame();
  return (
    <div className={styles.scene}>
      <HeroText />
      <ProviderDeck activeFrame={activeFrame} />
      <div className="object-center mt-[140px] w-20 h-20 hidden xl:block">
        <Image src="/Line.png" height={277} width={124} alt="line" />
      </div>
      <FrameDeck activeFrame={activeFrame} />
    </div>
  );
};

const NewHero: React.FC<Props> = (props) => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroShadesLayer}>
        <div className={styles.gradH} />
        <div className={styles.gradBt} />
      </div>
      <Scene />
    </div>
  );
};

export default NewHero;
