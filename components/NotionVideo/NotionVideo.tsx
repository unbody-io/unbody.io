import React from 'react';

interface Props {
    video: string[]
}


const NotionVideo = ({ video }: Props) => {
    const mp4hevc = video.find(v => v.endsWith("-o.mp4"));
    const mp4 = video.find(v => v.endsWith(".mp4") && !v.endsWith("-o.mp4"));
    const webm = video.find(v => v.endsWith(".webm"));

    const ref = React.useRef<HTMLVideoElement>(null);

    const forcePlay = () => {
        const video = ref.current;
        if (video) {
            video.play()
                .then(() => {
                    console.log("video playing");
                })
                .catch((e) => {
                    console.log("video play error");
                    console.log(e)
                });
        }
    }

    // play video on mount
    React.useEffect(() => {
        forcePlay();
    }, []);


    return (
        <video autoPlay={true}
               controls={false}
               muted={true}
               loop={true}
               playsInline={true}
               ref={ref}
               onMouseEnter={() => forcePlay}
        >
            {
                mp4hevc&&
                <source src={mp4hevc} type="video/mp4; codecs=hevc"/>
            }
            {
                webm&&
                <source src={webm} type="video/webm; codecs=vp9"/>
            }
            {
                mp4&&
                <source src={mp4} type="video/mp4"/>
            }
        </video>
    );
}

export default NotionVideo;
