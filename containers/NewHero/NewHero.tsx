import * as React from "react";

import styles from "./Hero.module.css";
import Button from "../../components/Button/Button";
import SectionFooter from "../SectionFooter/SectionFooter";
import { HTMLProps, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Props {}

type ProviderItem = {
  name: string;
  image: string;
};

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

const providers = [
  {
    name: "Drive",
    image: "/Provider Icons/Drive.svg",
  },
  {
    name: "Calander",
    image: "/Provider Icons/Calander.svg",
  },
  {
    name: "Dropbox",
    image: "/Provider Icons/Dropbox.svg",
  },
  {
    name: "Github",
    image: "/Provider Icons/Github.svg",
  },
  {
    name: "Gmail",
    image: "/Provider Icons/Gmail.svg",
  },
  {
    name: "Telegram",
    image: "/Provider Icons/Telegram.svg",
  },
  {
    name: "Finder",
    image: "/Provider Icons/Finder.svg",
  },
  {
    name: "Slack",
    image: "/Provider Icons/Slack.svg",
  },
  {
    name: "Notion",
    image: "/Provider Icons/Notion.svg",
  },
  {
    name: "Discord",
    image: "/Provider Icons/Discord.svg",
  },
];

type FrameItem = {
  providers: ProviderItem[];
  key: string;
  mockup: string;
  snippetCode: string;
};

const frames: FrameItem[] = [
  {
    providers: [providers[0]],
    key: "semantic-search",
    mockup: "/Scenario Images/Scenario01.png",
    snippetCode: "/Snippet Images/Snippet1.png",
  },
  {
    providers: [providers[0], providers[2]],
    key: "hybrid-search",
    mockup: "/Scenario Images/Scenario02.png",
    snippetCode: "/Snippet Images/Snippet2.png",
  },
  {
    providers: [providers[9]],
    key: "gen",
    mockup: "/Scenario Images/Scenario03.png",
    snippetCode: "/Snippet Images/Snippet3.png",
  },
  {
    providers: [providers[1], providers[3]],
    key: "test",
    mockup: "/Scenario Images/Scenario04.png",
    snippetCode: "/Snippet Images/Snippet4.png",
  },
  {
    providers: [providers[6]],
    key: "visual",
    mockup: "/Scenario Images/Scenario05.png",
    snippetCode: "/Snippet Images/Snippet5.png",
  },
];

const HeroScene = () => {};

const ProviderIcon = (props: { provider: ProviderItem; active: boolean }) => (
  <div
    className={`transition-all duration-300 h-16 w-16 bg-[url('/provider-border.svg')] rounded-xl items-center flex justify-center 
      ${!props.active ? "opacity-20" : ""}`}
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

const ProviderDeck = ({ activeFrame }: ProviderDeckProps) => (
  <div className={styles.providersDeck}>
    <ProviderIcon provider={dummyProvider} active={false} key="Dummy" />
    {providers.map((provider: ProviderItem, index) => (
      <ProviderIcon
        provider={provider}
        active={
          activeFrame.providers.findIndex((p) => p.name === provider.name) !==
          -1
        }
        key={`${provider.name}-${index}`}
      />
    ))}
  </div>
);

interface FrameDeckProps {
  activeFrame: FrameItem;
}

const FrameDeck = ({ activeFrame }: FrameDeckProps) => (
  <div className={`${styles.framesContainer} ${styles["mode1"]}`}>
    {frames.map((frame, index) => (
      <Frame
        frame={frame}
        key={`${frame.key}-index`}
        active={activeFrame.key === frame.key}
      />
    ))}
  </div>
);

// map range number from one range to another
const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

const FrameDeck2 = ({ activeFrame }: FrameDeckProps) => {
  const [boxH, setBoxH] = useState(0);
  const [containerH, setContainerH] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const activeIndex = frames.findIndex(
    (frame) => frame.key === activeFrame.key
  );
  const [scrollY, setScrollY] = useState(0);
  const [opacities, setOpacities] = useState<number[]>(frames.map(() => 0));

  const calcPaddingTop = () => {
    if (!ref.current) return 0;
    const { height } = ref.current.getBoundingClientRect();
    const box = ref.current.querySelector(`.${styles.frame}`);
    const boxHeight = box.getBoundingClientRect().height;
    return (height - boxHeight) / 2;
  };

  const handleScroll = () => {
    if (ref.current) {
      const containerH = ref.current.getBoundingClientRect().height;
      setOpacities(
        opacities.map((_, index) => {
          const element = ref.current?.querySelector(
            `.${styles.frame}:nth-child(${index + 1})`
          );
          if (element) {
            const { top, height } = element.getBoundingClientRect();
            const centerOfElement = top + height / 2;
            const distance = Math.abs(centerOfElement - containerH / 2);
            const maxDistance = containerH / 2;
            return mapRange(distance, 0, maxDistance, 1.3, 0.1);
          }
        })
      );
    }
  };

  useEffect(() => {
    const container = ref.current;
    const { height } = ref.current.getBoundingClientRect();
    const box = ref.current.querySelector(`.${styles.frame}`);
    if (box) {
      const boxHeight = box.getBoundingClientRect().height;
      setBoxH(boxHeight);
      ref.current.style.paddingTop = `${calcPaddingTop()}px`;
      ref.current.style.paddingBottom = `${height - boxHeight}px`;
    }
    setContainerH(height);
    container?.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scroll = () => {
    const { height } = ref.current.getBoundingClientRect();
    const scrollTo = boxH * activeIndex - height / 2 + boxH / 2;
    ref.current.scrollTo({
      top: Math.max(scrollTo + calcPaddingTop(), 0),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scroll();
  }, [activeFrame, boxH, activeIndex]);

  return (
    <div className={styles.framesContainerWrapper}>
      <div className={`${styles.framesContainer} ${styles["mode2"]}`} ref={ref}>
        <div className={styles.framesContainerInner}>
          {frames.map((frame, index) => (
            <Frame
              frame={frame}
              key={`${frame.key}-index`}
              active={activeFrame.key === frame.key}
              style={{
                opacity: opacities[index],
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const useActiveFrame = () => {
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);

  useInterval(() => {
    setActiveFrameIndex((activeFrameIndex + 1) % frames.length);
  }, 5000);

  return frames[activeFrameIndex];
};

const HeroText = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center">
      <span className="text-5xl font-bold flex flex-row ">
        Build &nbsp;
        <span className="flex flex-row">
          <span className={styles.gradientText}>A.I.</span>
          <Image src="MagicIcon.svg" width={20} height={20} alt="Magical" />
        </span>
        <span>&nbsp;apps</span>
      </span>

      <span className="flex flex-row">
        <span className="text-5xl font-bold">
          with
          <span className={styles.gradientText}> your data,</span>
        </span>
      </span>
      <span className="text-5xl font-bold">no fuss.</span>
      <p className="text-paraghraph_gray text-base leading-6">
        An invisible AI layer, a headless API designed to transform diverse
        content from any location or format into knowledge. Our aim is to enable
        developers at any level to build applications that understand our daily
        produced content, right out of box!
      </p>
      <div className="p-0.5 mt-4 cursor-pointer rounded-full w-40 h-12 bg-white text-gray-800 text-xs self-center flex flex-row  items-center justify-between  ">
        <span className="pl-4">Get Started</span>
        <div className="bg-gray-800 h-11 w-11 rounded-full flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
          >
            <g clip-path="url(#clip0_412_580)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
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
      <FrameDeck activeFrame={activeFrame} />
    </div>
  );
};

const NewHero: React.FC<Props> = (props) => {
  return (
    <section className={styles.hero}>
      <Scene />
    </section>
  );
};

export default NewHero;
