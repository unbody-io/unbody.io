import dayjs from "dayjs";
import {FC} from "react";

interface Props{
    date?: string;
}
export const DateComponent: FC<Props> = ({date}) => {
    const d = dayjs(date);
    return (
        <time dateTime={date}>{d.format('dddd, MMMM D, YYYY')}</time>
    )
}
