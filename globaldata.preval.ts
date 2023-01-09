// step 1: create a data.preval.js (or data.preval.ts) file
import preval from 'next-plugin-preval';
import {notionPageIds} from "./lib/config";
import {getDatabasePropsValue} from "./lib/utils.notion";

async function getData() {
    const footerData = await getDatabasePropsValue(notionPageIds.FOOTER, {
        name: null,
        link: null,
        external: null,
        category: null,
    })
    return { footerData };
}

// step 3: export default and wrap with `preval()`
export default preval(getData());
