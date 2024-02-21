import React, {useRef, useState} from "react";
import MuxVideo from "@mux/mux-video-react";
import styles from "./player.module.css";
import Image from "next/image";


export const VideoPlayer = ({videoFile, className = "", ...rest}) => {
    const [playing, setPlaying] = useState(false);
    const ref = useRef(null);

    const play = () => {
        if (ref.current) {
            ref.current.play();
        }
    }

    return (
        <div className={`${styles.player} ${className}`} {...rest}>
            <div className={`${styles.playIcon} ${playing? styles.hide:""}`}
                 onClick={() => play()}
            >
                <Image src={"/icons/play.svg"}
                       alt={"play"}
                       width={20}
                       height={20}
                />
            </div>

            <div style={{
                width: "100%",
                overflow: "hidden",
                borderRadius: "20px 20px 0 0",
                filter: `blur(${playing ? 0 : 3}px)`,
                transition: "filter 0.5s",
            }}>
                <MuxVideo
                    style={{height: '100%', maxWidth: '100%'}}
                    playbackId={videoFile?.playbackId}
                    metadata={{
                        video_id: videoFile?.assetId,
                        video_title: "Unbody intro demo",
                    }}
                    placeholder={videoFile?.animatedImageUrl?.gif}
                    streamType="on-demand"
                    controls
                    poster={videoFile?.animatedImageUrl.gif ?? ""}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    ref={ref}
                />
            </div>
        </div>
    )
}
