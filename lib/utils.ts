export const isValidLink = (u:string|null): boolean => {
    return u!==null&&u.trim().length>0
}

export const mapRange = (
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

export function formatDate(dateStr: string): string {
    const months: string[] = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const date: Date = new Date(dateStr);

    if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
    }

    const day: number = date.getDate();
    let suffix: string;

    switch (day) {
        case 1:
        case 21:
        case 31:
            suffix = 'st';
            break;
        case 2:
        case 22:
            suffix = 'nd';
            break;
        case 3:
        case 23:
            suffix = 'rd';
            break;
        default:
            suffix = 'th';
    }

    const month: string = months[date.getMonth()];
    const year: number = date.getFullYear();

    return `${month} ${day}${suffix}, ${year}`;
}
