// step 1: create a data.preval.js (or data.preval.ts) file
import preval from 'next-plugin-preval';
import {getDatabase} from "./lib/notion";
import {notionPageIds} from "./lib/config";
import {SelectPropertyResponse} from "./lib/notion.types";
import {getPropValue} from "./lib/utils.notion";

// step 2: write an async function that fetches your data
async function getData() {
    const footerData = await getDatabase(notionPageIds.FOOTER)
        .then((res) => {
            return res.map((record) => {
                if (!("properties" in record)) return null;
                const rawLink = getPropValue(record.properties.link) as string[];
                const rawName = getPropValue(record.properties.name) as string[]
                const rawExternal = getPropValue(record.properties.external) as boolean
                const rawCat = getPropValue(record.properties.category) as SelectPropertyResponse

                return {
                    name: rawName.join(" ").trim(),
                    link: rawLink.join(" ").trim(),
                    external: rawExternal,
                    cat: rawCat.name
                }
            }).filter((f) => f != null).reverse()
        })
        .catch(e => {
            console.log(e);
            return []
        })
    return { footerData };
}

// step 3: export default and wrap with `preval()`
export default preval(getData());
