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
