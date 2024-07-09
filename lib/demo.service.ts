// Types and Enums
export type InputData = {
    prompt?: string;
    query?: string;
    path?: string;
    limit?: number;
    text?: string;
    remoteId?: string;
}

export type Presets = {
    projectId?: string;
    apiKey?: string;
    key: string;
    label: string;
    family: string;
    supportedMethods?: string[];
    icons?: string[];
    disabled?: boolean;
}

export enum SourceTypes {
    GoogleDoc = "googleDoc",
    TextDocument = "textDocument",
    ImageBlock = "imageBlock",
    VideoFile = "videoFile",
    AudioFile = "audioFile",
    SubtitleFile = "subtitleFile",
    SubtitleEntry = "subtitleEntry",
    TextBlock = "textBlock",
    GoogleCalendarEvent = "googleCalendarEvent",
    DiscordMessage = "discordMessage",
    CsvRow = "csvRow",
    Spreadsheet = "spreadsheet",
    SpreadsheetDocument = "spreadsheetDocument",
    GithubThread = "githubThread",
    GithubComment = "githubComment",
}

export enum MethodCategoryName {
    Search = "search",
    Generative = "generative",
    GenerativeWithQueryParser = "generativeWithQueryParser",
    Filter = "filter",
    Group = "group",
    RAG = "RAG",
}

export type MethodCategory = {
    category: MethodCategoryName;
    description: string;
    methods: Method[];
    key: string | null;
};

export type Method = {
    category: MethodCategoryName;
    key: string;
    description: string;
    args: string[];
    handler: (args: InputData, unbody: any, sourceType: SourceTypes) => any;
    generateCodeString: (args: InputData, sourceType: SourceTypes) => string;
};

// Utility Functions
const getGeneratePropsForSource = (sourceType: SourceTypes, single: boolean = false) => {
    switch (sourceType) {
        case SourceTypes.GoogleDoc:
        case SourceTypes.TextDocument:
            return ["title", single ? "text" : "autoSummary"];
        case SourceTypes.ImageBlock:
            return ["autoCaption", "autoOCR"];
        case SourceTypes.VideoFile:
        case SourceTypes.AudioFile:
            return ["autoSummary"];
        case SourceTypes.SubtitleFile:
            return ["autoSummary"];
        case SourceTypes.SubtitleEntry:
            return ["text"];
        case SourceTypes.TextBlock:
            return ["text"];
        case SourceTypes.GoogleCalendarEvent:
            return ["title", "description"];
        case SourceTypes.DiscordMessage:
            return ["content"];
        case SourceTypes.GithubComment:
        case SourceTypes.GithubThread:
            return ["text"];
        default:
            return [];
    }
}

const getFieldsForSource = (sourceType: SourceTypes) => {
    switch (sourceType) {
        case SourceTypes.GoogleDoc:
        case SourceTypes.TextDocument:
            return ["title", "autoSummary", "html", "remoteId"];
        case SourceTypes.ImageBlock:
            return ["autoCaption", "autoOCR", "url", "width", "remoteId"];
        case SourceTypes.VideoFile:
        case SourceTypes.AudioFile:
            return ["autoSummary", "duration", "animatedImageUrl.webp", "remoteId"];
        case SourceTypes.SubtitleFile:
            return ["autoSummary", "remoteId"];
        case SourceTypes.SubtitleEntry:
            return ["text", "start", "end"];
        case SourceTypes.TextBlock:
            return ["text", "tagName"];
        case SourceTypes.GoogleCalendarEvent:
            return ["title", "description"];
        case SourceTypes.DiscordMessage:
            return ["content", "mentions", "remoteId"];
        case SourceTypes.GithubComment:
        case SourceTypes.GithubThread:
            return ["text", "remoteId"];
        default:
            return [];
    }
}

// Methods
const searchAbout: Method = {
    category: MethodCategoryName.Search,
    key: "about",
    description: "Search with human natural language",
    args: ["query"],
    handler: (args, unbody, sourceType) => unbody.get[sourceType].select(...getFieldsForSource(sourceType)).search.about(args.query),
    generateCodeString: (args, sourceType) => `search.about(${args.query})`,
}

const searchFind: Method = {
    category: MethodCategoryName.Search,
    key: "find",
    description: "Structured search method",
    args: ["query"],
    handler: (args, unbody, sourceType) => unbody.get[sourceType].select(...getFieldsForSource(sourceType)).search.find(args.query),
    generateCodeString: (args, sourceType) => `search.find(${args.query})`,
}

const searchHybrid: Method = {
    category: MethodCategoryName.Search,
    key: "hybrid",
    description: "Hybrid search method",
    args: ["query"],
    handler: (args, unbody, sourceType) => unbody.get[sourceType].select(...getFieldsForSource(sourceType)).search.hybrid(args.query),
    generateCodeString: (args, sourceType) => `search.hybrid(${args.query})`,
}

const generativeFromMany: Method = {
    category: MethodCategoryName.Generative,
    key: "fromMany",
    description: "Generative method from many",
    args: ["prompt"],
    handler: (args, unbody, sourceType) => unbody.get[sourceType].select(...getFieldsForSource(sourceType)).limit(5).generate.fromMany(args.prompt, getGeneratePropsForSource(sourceType)),
    generateCodeString: (args, sourceType) => `limit(5)\n\t\t\t\t\t\t\t .generate.fromMany(${args.prompt}, [${getGeneratePropsForSource(sourceType).map(s => `"${s}"`).join(",")}])`,
}

const generativeFromOne: Method = {
    category: MethodCategoryName.Generative,
    key: "fromOne",
    description: "Generative method from one",
    args: ["prompt"],
    handler: (args, unbody, sourceType) => unbody.get[sourceType].select(...getFieldsForSource(sourceType)).generate.fromOne(
        args.prompt + "\n" + getGeneratePropsForSource(sourceType, true).map(s => `{${s}}`).join(""),
    ),
    generateCodeString: (args, sourceType) => `generate.fromOne(${args.prompt})`,
}

const filterWhere: Method = {
    category: MethodCategoryName.Filter,
    key: "where",
    description: "Filter method where",
    args: ["condition"],
    handler: (args, unbody, sourceType) => unbody.get[sourceType].select(...getFieldsForSource(sourceType)).where({ remoteId: args.remoteId }),
    generateCodeString: (args, sourceType) => `where({remoteId: "${args.remoteId}"})`,
}

const filterWhereAdvanced: Method = {
    category: MethodCategoryName.Filter,
    key: "where advanced",
    description: "Filter method where",
    args: ["condition"],
    handler: (args, unbody, sourceType) => {
        const prop = getFieldsForSource(sourceType)[0];
        return unbody.get[sourceType].select(...getFieldsForSource(sourceType)).where(({ ContainsAny, Like, And }) => (
            And(
                { autoTopics: ContainsAny(args.text) },
                { [prop]: Like(args.text) }
            )
        ));
    },
    generateCodeString: (args, sourceType) => {
        const prop = getFieldsForSource(sourceType)[0];
        return `where(({ContainsAny, Like, And}) => (
            And(
                { autoTopics: ContainsAny("${args.text}") },
                { ${prop}: Like("${args.text}") }
            )
        ))`;
    }
}

const filterLimit: Method = {
    category: MethodCategoryName.Filter,
    key: "limit",
    description: "Filter method limit",
    args: ["limit"],
    handler: (args, unbody, sourceType) => unbody.get[sourceType].select(...getFieldsForSource(sourceType)).filter.limit(args.limit),
    generateCodeString: (args, sourceType) => `filter.limit(${args.limit})`,
}

const filterSelect: Method = {
    category: MethodCategoryName.Filter,
    key: "select",
    description: "Filter method select",
    args: ["fields"],
    handler: (args, unbody, sourceType) => unbody.get[sourceType].filter.select(...getFieldsForSource(sourceType)),
    generateCodeString: (args, sourceType) => {
        const fields = getFieldsForSource(sourceType).map(s => `"${s}"`).join(",");
        return `filter.select([${fields}])`;
    }
}

const ragStandard: Method = {
    category: MethodCategoryName.RAG,
    key: "basic",
    description: "RAG basic method",
    args: ["query","prompt"],
    handler: (args, unbody, sourceType) => unbody.get[sourceType].limit(5).select(...getFieldsForSource(sourceType))
        .search.about(args.query)
        .generate.fromMany(args.prompt, getGeneratePropsForSource(sourceType)),
    generateCodeString: (args, sourceType) => `limit(3)\n\t\t\t\t\t\t\t .search.about(${args.query})\n\t\t\t\t\t\t\t .generate.fromMany(${args.prompt}, [${getGeneratePropsForSource(sourceType).map(s => `"${s}"`).join(",")}])`,
}

// Method Categories
export const methodsCategories: MethodCategory[] = [
    {
        category: MethodCategoryName.Search,
        key: "search",
        description: "Search methods",
        methods: [searchAbout, searchFind, searchHybrid],
    },
    {
        category: MethodCategoryName.Generative,
        key: "generative",
        description: "Generative methods",
        methods: [generativeFromMany, generativeFromOne],
    },
    {
        category: MethodCategoryName.Filter,
        key: "filter",
        description: "Filter methods",
        methods: [filterWhere, filterWhereAdvanced, filterLimit, filterSelect],
    },
    {
        category: MethodCategoryName.RAG,
        key: "RAG",
        description: "Retrieval Augmented Generation methods",
        methods: [ragStandard],
    }
]


export const generateCodeString = (selectedSourceTypes: SourceTypes[], input: InputData, method: Method) => {
    let code = (`\n`);

    if (selectedSourceTypes.length === 0) {
        return;
    } else if (selectedSourceTypes.length === 1) {
        code += [
            `const response = await unbody.get\n\t\t\t\t\t\t\t .${selectedSourceTypes[0]}`,
            "."+method.generateCodeString({
                ...input,
                query: "query",
                prompt: "prompt",
            }, selectedSourceTypes[0]),
            `.exec();`
        ].join("\n\t\t\t\t\t\t\t ");

        code+=`\n\n`;
    } else {
        const queries = selectedSourceTypes.map((sourceType) => (
            `unbody.get.${sourceType}.`+method.generateCodeString({
                ...input,
                query: "query",
                prompt: "prompt",
            }, sourceType)
        ));
        code += `const queries = [\n\t${queries.join(",\n\t")}\n];\n\n`;
        code += `const response = await unbody.exec(queries);\n\n`;
    }
    code += `console.log(response);`;
    return code;
}

export const UNBODY_CLIENT_CODE = (input: InputData) => (`
const unbody = new Unbody({
    apiKey: "API_KEY",
    projectId: "PROJECT_ID",
});`)

type SourceTypeOption = {
    sourceType: SourceTypes;
    label: string;
    subLabel?: string;
    disabled?: boolean;
    icon: string;
}

export const INPUTS_CODE = (input: InputData) => {
    let code = (``);
    if (input.query) {
        code += (`const query = "${input.query}";\n\n`);
    }
    if (input.prompt) {
        code += (`const prompt = "${input.prompt}";\n\n`);
    }
    return code;
}


// Presets
export const demoPresets: Presets[] = [
    {
        key: "openai",
        label: "Open AI (GPT-4)",
        family: "openai",
        icons: ["/icons/demo/ai-presets/openai.png"],
    },
    {
        key: "cohere_r",
        label: "Cohere Command R",
        family: "cohere",
        icons: [
            "/icons/demo/ai-presets/cohere.png"
        ],
    },
    {
        key: "cohere_r_plus",
        label: "Cohere Command R+",
        family: "cohere",
        icons: [
            "/icons/demo/ai-presets/cohere.png"
        ],
    },
    {
        key: "unbody_mistral",
        label: "Unbody Mistral",
        family: "unbody",
        icons: [
            "/icons/demo/ai-presets/unbody.png",
            "/icons/demo/ai-presets/mistral.png"
        ],
    }
]

export const demoSourceTypes: SourceTypeOption[] = [
    {
        sourceType: SourceTypes.GoogleDoc,
        label: "Google Doc",
        icon: "/icons/demo/source-types/googleDoc.png",
        disabled: false,
    },
    {
        sourceType: SourceTypes.TextDocument,
        label: "Text Document",
        subLabel: "PDF, Word, etc.",
        icon: "/icons/demo/source-types/textDocument.svg",
        disabled: false,
    },
    {
        sourceType: SourceTypes.ImageBlock,
        label: "Image Block",
        subLabel: "jpg, png, gif, etc",
        icon: "/icons/demo/source-types/imageBlock.svg",
        disabled: false,
    },
    {
        sourceType: SourceTypes.VideoFile,
        label: "Video File",
        icon: "/icons/demo/source-types/videoFile.svg",
        disabled: false,
    },
    {
        sourceType: SourceTypes.AudioFile,
        label: "Audio File",
        icon: "/icons/demo/source-types/audioFile.svg",
        disabled: false,
    },
    {
        sourceType: SourceTypes.SubtitleFile,
        label: "Subtitle File",
        subLabel: "auto-transcribed subtitles from video/audio",
        icon: "/icons/demo/source-types/subtitleFile.png",
        disabled: false,
    },
    {
        sourceType: SourceTypes.SubtitleEntry,
        label: "Subtitle Entry",
        icon: "/icons/demo/source-types/subtitleEntry.png",
        disabled: false,
    },
    {
        sourceType: SourceTypes.TextBlock,
        label: "Text Block",
        icon: "/icons/demo/source-types/textBlock.png",
        disabled: false,
    },
    {
        sourceType: SourceTypes.GoogleCalendarEvent,
        label: "Google Calendar Event",
        icon: "/icons/demo/source-types/googleCalendarEvent.png",
        disabled: false,
    },
    {
        sourceType: SourceTypes.DiscordMessage,
        label: "Discord Message",
        icon: "/icons/demo/source-types/discordMessage.svg",
        disabled: false,
    },
    {
        sourceType: SourceTypes.GithubComment,
        label: "Github Comment",
        icon: "/icons/demo/source-types/githubComment.svg",
        disabled: false,
    },
    {
        sourceType: SourceTypes.GithubThread,
        label: "Github Thread",
        icon: "/icons/demo/source-types/githubThread.svg",
        disabled: false,
    },
    {
        sourceType: SourceTypes.CsvRow,
        label: "CSV Row",
        icon: "/icons/demo/source-types/csv.png",
        disabled: false,
    },
    {
        sourceType: SourceTypes.Spreadsheet,
        label: "Spreadsheet",
        icon: "/icons/demo/source-types/spreadsheet.png",
        disabled: false,
    },
    {
        sourceType: SourceTypes.SpreadsheetDocument,
        label: "Spreadsheet Document",
        icon: "/icons/demo/source-types/spreadsheetDocument.png",
        disabled: true,
    },
]
