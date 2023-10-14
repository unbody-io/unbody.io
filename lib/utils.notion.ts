import {PageObjectResponse} from "@notionhq/client/build/src/api-endpoints";
import {NotionDatabaseProp} from "./notion.types";
import {ISection, PropValue} from "./data.types";
import {getDatabase} from "./notion";
import {getRemoteFilePath} from "./utils";


export const getTableItemTextValue = (p: PageObjectResponse): null | string => {
    if (!p.properties.title) return null;
    if (!("title" in p.properties.title)) return null;
    if (!p.properties.title.title.length) return null;
    return p.properties.title.title[0.].plain_text
}

export const getSectionTitle = (section: ISection): string | null => {
    return getTableItemTextValue(section.page)
}

export async function getPropValue(prop: NotionDatabaseProp) {
    switch (prop.type) {
        case "rich_text":
            return prop.rich_text.map(rt => {
                switch (rt.type) {
                    case "text":
                        return rt.text.content
                    case "equation":
                        return rt.plain_text
                    case "mention":
                        return rt.plain_text
                    default:
                        return []
                }
            }).join(" ").trim()
        case "checkbox":
            return prop.checkbox
        case "title":
            return prop.title.map(t => t.plain_text).join(" ").trim()
        case "url":
            return prop.url
        case "select":
            return prop.select
        case "multi_select":
            return prop.multi_select
        case "formula":
            //@ts-ignore
            return prop.formula.string
        case "files":
            return prop.files.map(f => {
                switch (f.type) {
                    case "external":
                            return getRemoteFilePath(f.external.url)
                    case "file":
                        return getRemoteFilePath(f.file.url)
                    default:
                        return null
                }
            })
                .filter(f => f !== null);
        case "people":
            return prop.people
        case "number":
            return prop.number
        default:
            return []
    }
}

export const getDatabasePropsValue = async (id: string, props: PropValue<string, null>, bp?: any): Promise<(PropValue<any, any>)[]> => {
    try {
        const records = await getDatabase(id, bp);
        return Promise.all(
            records.map(async(r) => {
                if (!("properties" in r)) return null;
                let thisProps: Record<string, any> = {};
                for await(const key of Object.keys(props)){
                    try {
                        // @ts-ignore
                        thisProps[key] = await getPropValue(r.properties[key]);
                    } catch (e) {
                        console.log(`error: could not find ${key} in properties of ${id}`)
                    }
                }
                thisProps.id = r.id;
                // @ts-ignore
                thisProps.updated = r.last_edited_time;
                return thisProps;
            })
        ).then(data => data.filter(n => n != null) as (PropValue<any, any>)[])
    } catch (e) {
        console.log(e)
        return [];
    }
}
