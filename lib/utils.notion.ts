import {PageObjectResponse} from "@notionhq/client/build/src/api-endpoints";
import {NotionDatabaseProp} from "./notion.types";
import {ISection, PropValue} from "./data.types";
import {getDatabase} from "./notion";


export const getTableItemTextValue = (p: PageObjectResponse): null | string => {
    if (!p.properties.title) return null;
    if (!("title" in p.properties.title)) return null;
    if (!p.properties.title.title.length) return null;
    return p.properties.title.title[0.].plain_text
}
export const getSectionTitle = (section: ISection): string | null => {
    return getTableItemTextValue(section.page)
}

export function getPropValue(prop: NotionDatabaseProp){
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
                        return f.external.url
                    case "file":
                        return f.file.url
                    default:
                        return null
                }
            }).filter(f => f!==null)
        case "people":
            return prop.people
        default:
            return []
    }
}

export const getDatabasePropsValue = async (id: string, props: PropValue<string, null>, bp?: any): Promise<(PropValue<any, any>)[]> => {
    try{
        const records =  await getDatabase(id, bp);
        return records.map(r => {
            if (!("properties" in r)) return null;
            let thisProps: Record<string, any> = {};
            Object.keys(props).forEach((key) => {
                try{
                    thisProps[key] = getPropValue(r.properties[key]);
                }catch (e){
                    console.log(`error: could not find ${key} in properties of ${id}`)
                }
            })
            thisProps.id = r.id;
            thisProps.updated = r.last_edited_time;
            return thisProps;
        }).filter(n => n!=null) as (PropValue<any, any>)[]
    }catch (e){
        console.log(e)
        return [];
    }
}
