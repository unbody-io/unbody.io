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
