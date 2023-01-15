const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd())

const {createWriteStream} = require('fs');
const {get}= require('https');
const {Client} = require("@notionhq/client");

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

function extractFilenameFromNotionUrl(url){
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1].split('?')[0];
}

const getRemoteFilePath = (url) => {
    return `public/remotes/${extractFilenameFromNotionUrl(url)}`
}


async function downloadFile(url, filepath){
    return new Promise((resolve, reject) => {
        get(url, (res) => {
            res.pipe(createWriteStream(filepath));
            res.on('end', () => {
                resolve();
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}
const sources = [
    {name: "FEATURES", key:"video", id: "a4c32d3548e64215868deea16a5d7f0d"},
    {name: "PROVIDERS", key:"logo", id: "ef7cd27b221a4f1daceeefbc85bf8339"},
    {name: "FILES", key:"logo", id: "929760e397794edeb7b6f18d1b6abb3f"},
    {name: "BLOGPOSTS", key:"image", id: "65ab0c40507c492998fa8fa54c9b53ae"}
];

(async() => {
    const download = async (source) => {
        try {
            const records = await notion.databases.query({
                database_id: source.id
            }).then(res => res.results);

            for await (const r of records){
                if (!("properties" in r)) break;
                if(!(source.key in r.properties)) break;
                const prop = r.properties[source.key];

                for await (const file of prop.files){
                    const url = prop.type === "external"? file.external.url: file.file.url;
                    const path = getRemoteFilePath(url);
                    await downloadFile(url, path);
                }
            }
        } catch (e) {
            console.log(e)
            return [];
        }
    }

    for await (const source of sources){
        await download(source);
    }
})();
