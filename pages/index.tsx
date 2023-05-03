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

import {FeatureProp, FileProp, ISection, ProviderProp, UseCasesProps} from "../lib/data.types";
import {getDatabasePropsValue, getSectionTitle} from "../lib/utils.notion";
import UseCases from "../containers/Usecases/Usecases";
import ActionButtonGroup from "../containers/ActionButtonGroup/ActionButtonGroup";
import {Meta} from "../components/Meta";
import SourceList from '../containers/SourceList/SourceList';


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
    files: FileProp[]
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
                             learnMoreAlt={"Learn more why using Unbody?"}
                >
                    <Render blocks={sections.why.content as NotionBlock[]}/>
                </InfoSection>
                <InfoSection label={"HOW"}
                             title={getSectionTitle(sections.how) || ":("}
                             learnMoreLink={"/about/#how-unbody-works"}
                             learnMoreAlt={"Learn more about how Unbody works"}
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
                    <SourceList data={
                        providers.map(p => ({
                            name: p.name,
                            type: "provider",
                            status: p.status,
                            logo: p.logo,
                            copy_description: p.copy_description,
                            tags: p.tags,
                            id: p.id
                        }))
                    }
                                title={"Supported Providers"}
                    />
                    <SourceList data={
                        files.map(p => ({
                            name: p.name,
                            type: "file",
                            status: p.status,
                            logo: p.logo,
                            copy_description: p.copy_description,
                            tags: p.formats,
                            id: p.id
                        }))
                    }    type={"file"} title={"Supported Files"}/>
                    <div style={{textAlign: "center"}}>
                        <br/>
                        <ActionButtonGroup learnMoreLink={""}/>
                    </div>
                </DisplaySection>
                <InfoSection label={"USE-CASES"}
                             learnMoreLink={"/about"}
                             learnMoreAlt={"Learn more about Unbody's usecases"}
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
        order: null,
        disabled: null
    })

    const providers = await getDatabasePropsValue(notionPageIds.PROVIDERS, {
        name: null,
        tags: null,
        status: null,
        copy_description: null,
        logo: null,
        order: null,
        supported_files: null,
        supported_file_types: null,
    })

    const files = await getDatabasePropsValue(notionPageIds.FILES, {
        name: null,
        formats: null,
        status: null,
        copy_description: null,
        logo: null,
        order: null,
        supported_providers: null,
    })


    const useCases = await getDatabasePropsValue(notionPageIds.USECASES, {
        title: null,
        outline: null,
        link: null,
        order: null
    })

    return {
        props: {
            providers: providers.sort((a,b) => (a.order||1)-(b.order||10)),
            files: files.sort((a,b) => (a.order||10)-(b.order||10)),
            features: features.sort((a,b) => (a.order||10)-(b.order||10)),
            useCases: useCases.sort((a,b) => (a.order||10)-(b.order||10)),
            sections: sections
                .filter((s => s.key))
                .reduce(
                    (obj, item) => Object.assign(obj, {[item.key as string]: item}), {})
        },
        revalidate: 10
    }
}
