import {PageObjectResponse} from "@notionhq/client/build/src/api-endpoints";
import {NotionDatabaseProp} from "./notion.types";
import {ISection} from "./data.types";


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
            });
        case "checkbox":
            return prop.checkbox
        case "title":
            return prop.title.map(t => t.plain_text)
        case "url":
            return prop.url
        case "select":
            return prop.select
        case "multi_select":
            return prop.multi_select
        default:
            return []
    }
}
