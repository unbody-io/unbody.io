import {HTMLProps, PropsWithChildren} from "react";
import {Marquee as Marquee_} from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";

type Props = {
    direction?: "left" | "up";
    className?: string;
};

export const Marquee = (props: PropsWithChildren<Props>) => {
    return (
        <div style={{
            // maskImage: `linear-gradient(to ${props.direction}, transparent 0%, rgba(0, 11, 0, 1.0) 50%, rgba(0, 0, 0, 1.0) 50%, transparent 100%)`,
            overflow: "hidden",
        }}>
            <Marquee_
                fade={false}
                direction={props.direction}
                pauseOnHover={false}
                className={props.className}
                numberOfCopies={4}
            >
                {props.children}
            </Marquee_>
        </div>
    )
}
