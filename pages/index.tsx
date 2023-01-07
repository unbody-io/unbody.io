import Head from 'next/head'

import styles from '../styles/Home.module.css'
import Hero from "../containers/Hero/Hero";
import {getBlocks, getDatabase} from "../lib/notion";
import {notionPageIds} from "../lib/config";
import {GetStaticProps, NextPage} from "next";

import {Render} from "@9gustin/react-notion-render";

import InfoSection from "../containers/InfoSection/InfoSection";
import {NotionBlock} from "@9gustin/react-notion-render/dist/types/NotionBlock";
import DisplaySection from "../containers/DisplaySection/DisplaySection";
import Tabs from "../components/Tabs/Tabs";
import FeaturePanel from "../components/FeaturePanel/FeaturePanel"

import {SelectPropertyResponse} from "../lib/notion.types";
import {FeatureProp, ISection, ProviderProp, UseCasesProps} from "../lib/data.types";
import Providers from "../containers/Providers/Providers";
import {getPropValue, getSectionTitle} from "../lib/utils.notion";
import {ArrowRight} from "../components/Arrow";
import UseCases from "../containers/Usecases/Usecases";


interface IProps {
    sections: {
        moto: ISection
        description: ISection
        why: ISection
        how: ISection
        providers: ISection
        files: ISection
    }
    features: FeatureProp[]
    providers: ProviderProp[]
    files: ProviderProp[]
    useCases: UseCasesProps[]
}

const Home: NextPage<IProps> = (props) => {
    const {sections, features, providers, files, useCases} = props;
    //@ts-ignore
    const headline = sections.moto.content[0].paragraph.rich_text[0].plain_text
    //@ts-ignore
    const description = sections.description.content[0].paragraph.rich_text[0].plain_text

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <Hero headline={headline || "We do not need CMS"}
                      description={description}
                />
                <InfoSection label={"WHY"}
                             title={getSectionTitle(sections.why) || ":("}
                             learnMoreLink={"/docs/why"}
                >
                    <Render blocks={sections.why.content as NotionBlock[]}/>
                </InfoSection>
                <InfoSection label={"HOW"}
                             title={getSectionTitle(sections.how) || ":("}
                             learnMoreLink={"/docs/how"}
                >
                    <Render blocks={sections.how.content as NotionBlock[]}/>
                </InfoSection>
                <DisplaySection label={"features"}
                                title={`OMG 😱<br/>↯<br/>All you need, right out-of-the-box`}
                >
                    <Tabs tabs={
                        features.map(f => {
                            return {
                                id: f.key,
                                title: f.key,
                                content: (
                                    <FeaturePanel data={f}/>
                                )
                            }
                        })
                    }/>
                </DisplaySection>
                <DisplaySection label={"Providers"}
                                title={`Flexible 🌊<br/>↯<br/>Use the apps and files you love`}
                                className={"providers"}
                >
                    <Providers data={providers} title={"Supported Providers"}/>
                    <Providers data={files} title={"Supported Files"}/>
                </DisplaySection>
                <InfoSection label={"USE-CASES"}
                             learnMoreLink={"/docs/use-cases"}
                >
                    <UseCases data={useCases}/>
                </InfoSection>
            </main>
        </>
    )
}

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
    const records = await getDatabase(notionPageIds.LANDING);
    const sections = await Promise.all(
        records.map(async (page) => ({
            page,
            key:
                (
                    "properties" in page
                    && "rich_text" in page.properties.label
                    && page.properties.label.rich_text[0]
                )
                    ? (page.properties.label.rich_text[0].plain_text || null) : null,
            content: await getBlocks(page.id)
        }))
    )

    const features = await getDatabase(notionPageIds.FEATURES)
        .then((res) => {
            return res.map((f) => {
                if (!("properties" in f)) return null;
                const rawTitle = getPropValue(f.properties["title"]) as string[]
                const rawBenefits = getPropValue(f.properties["key-benefits"]) as string[]
                const rawKey = getPropValue(f.properties["key"]) as string[]
                const rawVideo = getPropValue(f.properties.video) as string;
                return {
                    key: rawKey?.join(" ").trim(),
                    title: rawTitle.join(" ").trim(),
                    benefits: rawBenefits?.join("").split('\n').map(k => k.trim()).filter(c => c.length>0),
                    id: f.id,
                    video: rawVideo
                }
            }).filter((f) => f !== null);
        })
        .catch(e => {
            console.log(e);
            return []
        })


    const providers = await getDatabase(notionPageIds.PROVIDERS)
        .then((res) => {
            return res.map((f) => {
                if (!("properties" in f)) return null;

                const rawName = getPropValue(f.properties.name) as string[]
                const rawTags = getPropValue(f.properties["tags"]) as Array<SelectPropertyResponse>;
                const rawCopy = getPropValue(f.properties["copy_description"]) as string[]
                const rawStatus = getPropValue(f.properties["status"]) as SelectPropertyResponse

                return {
                    notionId: f.id,
                    name: rawName.join(" ").trim(),
                    tags: rawTags.map(t => t.name),
                    copy_description: rawCopy.join(" ").trim(),
                    status: rawStatus? rawStatus.name: null,
                    logo:""
                }
            }).filter((f) => f != null).reverse()
        })
        .catch(e => {
            console.log(e);
            return []
        })

    const files = await getDatabase(notionPageIds.FILES)
        .then((res) => {
            return res.map((f) => {
                if (!("properties" in f)) return null;

                const rawName = getPropValue(f.properties.name) as string[]
                const rawTags = getPropValue(f.properties["tags"]) as Array<SelectPropertyResponse>;
                const rawCopy = getPropValue(f.properties["copy_description"]) as string[]
                const rawStatus = getPropValue(f.properties["status"]) as SelectPropertyResponse

                return {
                    notionId: f.id,
                    name: rawName.join(" ").trim(),
                    tags: rawTags.map(t => t.name),
                    copy_description: rawCopy.join(" ").trim(),
                    status: rawStatus? rawStatus.name: null,
                    logo:""
                }
            }).filter((f) => f != null).reverse()
        })
        .catch(e => {
            console.log(e);
            return []
        })


    const useCases = await getDatabase(notionPageIds.USECASES)
        .then((res) => {
            return res.map((f) => {
                if (!("properties" in f)) return null;

                const rawTitle = getPropValue(f.properties.title) as string[]
                const rawCopy = getPropValue(f.properties.outline) as string[]
                const rawLink = getPropValue(f.properties.link) as string;

                return {
                    notionId: f.id,
                    title: rawTitle.join(" ").trim(),
                    outline: rawCopy.join(" ").trim(),
                    link: rawLink
                }
            }).filter((f) => f != null).reverse()
        })
        .catch(e => {
            console.log(e);
            return []
        })

    return {
        props: {
            providers,
            files,
            features,
            useCases,
            sections: sections
                .filter((s => s.key))
                .reduce(
                    (obj, item) => Object.assign(obj, {[item.key as string]: item}), {})
        },
        revalidate: 10
    }
}
