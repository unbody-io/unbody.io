import {BlockObjectResponse, PageObjectResponse} from "@notionhq/client/build/src/api-endpoints";

export interface FeatureProp {
    notionId: string;
    title: string;
    key: string;
    benefits: string[];
    video: string;
}

export interface ProviderProp{
    notionId: string;
    name: string;
    tags: string[];
    status: string|null;
    copy_description: string;
    logo: string|null
}

export interface ISection {
    page: PageObjectResponse
    content: BlockObjectResponse[]
    key: string
}

export type FooterItemProps = {
    name: string;
    link: string;
    cat: string;
    external: boolean
}

export interface GlobalData{
    footer: FooterItemProps[]
}
export interface UseCasesProps{
    title: string;
    link: string;
    outline: string;
}
