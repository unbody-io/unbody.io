import Head from 'next/head'

import styles from '../styles/Home.module.css'
import Hero from "../containers/Hero/Hero";
import {getBlocks, getDatabase} from "../lib/notion";
import {AppConfig, notionPageIds} from "../lib/config";
import {GetStaticProps, NextPage} from "next";

import {Render} from "@9gustin/react-notion-render";

import InfoSection from "../containers/InfoSection/InfoSection";
import {NotionBlock} from "@9gustin/react-notion-render/dist/types/NotionBlock";
import DisplaySection from "../containers/DisplaySection/DisplaySection";
import Tabs from "../components/Tabs/Tabs";
import FeaturePanel from "../components/FeaturePanel/FeaturePanel"

import {FeatureProp, ISection, ProviderProp, UseCasesProps} from "../lib/data.types";
import Providers from "../containers/Providers/Providers";
import {getDatabasePropsValue, getPropValue, getSectionTitle} from "../lib/utils.notion";
import UseCases from "../containers/Usecases/Usecases";
import ActionButtonGroup from "../containers/ActionButtonGroup/ActionButtonGroup";
import {Meta} from "../components/Meta";


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
            <Meta title={AppConfig.title}
                  description={`${description}`}
            />
            <main className={styles.main}>
                <Hero headline={headline || "We do not need CMS"}
                      description={description}
                />
                <InfoSection label={"WHY"}
                             title={getSectionTitle(sections.why) || ":("}
                             learnMoreLink={"/about/#why-unbody"}
                >
                    <Render blocks={sections.why.content as NotionBlock[]}/>
                </InfoSection>
                <InfoSection label={"HOW"}
                             title={getSectionTitle(sections.how) || ":("}
                             learnMoreLink={"/about/#how-unbody-works"}
                >
                    <Render blocks={sections.how.content as NotionBlock[]}/>
                </InfoSection>
                <DisplaySection label={"features"}
                                title={`Super Powers ✨<br/>↯<br/>All you need, right out-of-the-box`}
                >
                    <Tabs tabs={
                        features.map(f => {
                            return {
                                id: f.key,
                                title: f.key,
                                content: (
                                    <FeaturePanel data={f} key={f.key}/>
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
                    <Providers data={files} type={"file"} title={"Supported Files"}/>
                    <div style={{textAlign: "center"}}>
                        <br/>
                        <ActionButtonGroup learnMoreLink={""}/>
                    </div>
                </DisplaySection>
                <InfoSection label={"USE-CASES"}
                             learnMoreLink={"/about"}
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

    const features = await getDatabasePropsValue(notionPageIds.FEATURES, {
        key: null,
        benefits: null,
        video: null,
        title: null,
        slug: null,
        order: null
    })

    const providers = await getDatabasePropsValue(notionPageIds.PROVIDERS, {
        name: null,
        tags: null,
        status: null,
        copy_description: null,
        logo: null,
        order: null
    })

    const files = await getDatabasePropsValue(notionPageIds.FILES, {
        name: null,
        tags: null,
        status: null,
        copy_description: null,
        logo: null,
        order: null
    })


    const useCases = await getDatabasePropsValue(notionPageIds.USECASES, {
        title: null,
        outline: null,
        link: null,
        order: null
    })

    return {
        props: {
            providers: providers.sort((a,b) => (a.order||-1)-(b.order||-1)),
            files: files.sort((a,b) => (a.order||-1)-(b.order||-1)),
            features: features.sort((a,b) => (a.order||-1)-(b.order||-1)),
            useCases: useCases.sort((a,b) => (a.order||-1)-(b.order||-1)),
            sections: sections
                .filter((s => s.key))
                .reduce(
                    (obj, item) => Object.assign(obj, {[item.key as string]: item}), {})
        },
        revalidate: 10
    }
}
