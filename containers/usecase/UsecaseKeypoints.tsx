type Props = {
    data: {
        title: string;
        description: string;
        icon: string
    }[]
}

export const UsecaseKeypoints = ({data}: Props) => {
    return (
        <div className={"flex flex-col mt-12 mb-16 justify-items-center items-center text-center"}>
            <div className={`p-4 lg:p-8 text-7xl font-semibold text-center`}>
                Key Points
            </div>
            <div className={"flex flex-row justify-center items-center"}>
                {
                    data.map((keypoint, index) => (
                        <div key={index} className={"flex flex-col items-center justify-center"}>
                            <img src={keypoint.icon} alt={keypoint.title} className={"w-20 h-20"} />
                            <p className={"text-medium"}>{keypoint.title}</p>
                            <p className={"text-sm"}>{keypoint.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
