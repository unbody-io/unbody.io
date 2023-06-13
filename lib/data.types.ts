import {
    BlockObjectResponse,
    PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import {SelectPropertyResponse} from "./notion.types";

export interface NotionDatabaseProps{
    id: string;
    updated: string;
    order?: number
}

export interface FeatureProp extends NotionDatabaseProps{
    id: string;
    title: string;
    key: string;
    benefits: string;
    video: string[];
    slug: string;
    outline: string
    disabled: boolean;
}


export interface ProviderProp extends NotionDatabaseProps{
    name: string;
    tags: SelectPropertyResponse[];
    status: SelectPropertyResponse;
    supported_file_types: SelectPropertyResponse[];
    supported_files: SelectPropertyResponse[];
    copy_description: string;
    logo: string[]|null
}

export interface FileProp extends NotionDatabaseProps{
    name: string;
    formats: SelectPropertyResponse[];
    supported_providers: SelectPropertyResponse[];
    status: SelectPropertyResponse;
    logo: string[]|null
    copy_description: string;
    order: number;
}

export interface FooterItemProps extends NotionDatabaseProps{
    name: string;
    link: string;
    category: SelectPropertyResponse;
    external: boolean
}

export interface UseCasesProps extends NotionDatabaseProps{
    title: string;
    link: string;
    outline: string;
}

export interface BlogPostProps extends NotionDatabaseProps{
    title: string
    subtitle: string
    slug: string
    tags: SelectPropertyResponse[]
    purpose: string
    author: SelectPropertyResponse[]
    published: boolean
    seotags: SelectPropertyResponse[]
    audience: SelectPropertyResponse
    outline: string;
}

export interface SinglePageProps extends NotionDatabaseProps{
    slug: string;
    title: string
    subtitle:string;
    display_title: string
    published: boolean
    outline: string
}

export interface GlobalData{
    footer: FooterItemProps[]
}


export interface ISection {
    page: PageObjectResponse
    content: BlockObjectResponse[]
    key: string
}

export type PropValue<K extends string, V> = Record<K, V>
