import {Client} from "@notionhq/client";
// import {NotionAPI} from 'notion-client'
// import {
//     BlockObjectResponse,
//     ListBlockChildrenResponse,
//     PartialBlockObjectResponse
// } from "@notionhq/client/build/src/api-endpoints";

// export const notionx = new NotionAPI()

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

export const getDatabase = async (databaseId: string, bp: any = {}) => {
    const response = await notion.databases.query({
        database_id: databaseId,
        ...bp
    });
    return response.results;
};

// export const getPage = async (pageId: string) => {
//     const response = await notion.pages.retrieve({page_id: pageId});
//     return response;
// };

export const getBlocks = async (blockId: string) => {
    const blocks = [];
    let cursor;
    while (true) {
        // @ts-ignore
        const {results, next_cursor} = await notion.blocks.children.list({
            start_cursor: cursor,
            block_id: blockId,
        });

        const resultsWComments = await Promise.all(
            results.map(async (b) => ({
                ...b,
                comments: await notion.comments.list({block_id: b.id})
                    .catch((e) => {
                        console.log(e);
                        return [];
                    })
            }))
        );

        blocks.push(...resultsWComments);
        if (!next_cursor) {
            break;
        }
        cursor = next_cursor;
    }
    return blocks;
};


export default notion;
