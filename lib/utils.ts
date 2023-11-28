export function groupBy<T>(arr: T[], fn: (item: T) => any) {
    return arr.reduce<Record<string, T[]>>((prev, curr) => {
        const groupKey = fn(curr);
        const group = prev[groupKey] || [];
        group.push(curr);
        return { ...prev, [groupKey]: group };
    }, {});
}

export const isValidLink = (u:string|null): boolean => {
    return u!==null&&u.trim().length>0
}
export function extractFilenameFromNotionUrl(url: string): string {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1].split('?')[0];
}

export const getRemoteFilePath = (url: string): string => {
    return `/remotes/${extractFilenameFromNotionUrl(url)}`
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
