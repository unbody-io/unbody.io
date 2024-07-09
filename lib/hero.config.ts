
export const providersInDeck = [
    {
        name: "Telegram-dummy",
        image: "/provider-icons/Telegram.svg",
    },
    {
        name: "Finder-dummy",
        image: "/provider-icons/Finder.svg",
    },
    {
        name: "Slack",
        image: "/provider-icons/Slack.svg",
    },
    {
        name: "Notion",
        image: "/provider-icons/Notion.svg",
    },
    {
        name: "Discord",
        image: "/provider-icons/Discord.svg",
    },
    {
        name: "Drive",
        image: "/provider-icons/Drive.svg",
    },
    {
        name: "Calander",
        image: "/provider-icons/Calander.svg",
    },
    {
        name: "Dropbox",
        image: "/provider-icons/Dropbox.svg",
    },
    {
        name: "Github",
        image: "/provider-icons/Github.svg",
    },
    {
        name: "Gmail",
        image: "/provider-icons/Gmail.svg",
    },
    {
        name: "Finder",
        image: "/provider-icons/Finder.svg",
    },
    {
        name: "Telegram",
        image: "/provider-icons/Telegram.svg",
    },
    {
        name: "Slack",
        image: "/provider-icons/Slack.svg",
    },
];

export const AIProviders = [
    {
        name: "OpenAI",
        image: "/icons/demo/ai-presets/openai.png",
    },
    {
        name: "Cohere",
        image: "/icons/demo/ai-presets/cohere.png",
    },
    {
        name: "anthropic",
        image: "/icons/demo/ai-presets/anthropic.png",
    },
    {
        name: "Weaviate",
        image: "/icons/demo/ai-presets/weaviate.png",
    },
    {
        name: "Mistral",
        image: "/icons/demo/ai-presets/mistral.png",
    },
    {
        name: "Hugging Face",
        image: "/icons/demo/ai-presets/hf.png",
    },
    {
        name: "Gemini",
        image: "/icons/demo/ai-presets/gemini.png",
    },
    {
        name: "PyTorch",
        image: "/icons/demo/ai-presets/pytorch.png",
    },
    {
        name: "Mux",
        image: "/icons/demo/ai-presets/mux.png",
    },
    {
        name: "Imgix",
        image: "/icons/demo/ai-presets/imgix.png",
    }
]




export type ProviderItem = {
    name: string;
    image: string;
};

export type FrameItem = {
    providers: ProviderItem[];
    key: string;
    mockup: string;
    snippetCode: string;
};

export const heroFrames: FrameItem[] = [
    {
        providers: [providersInDeck[5]],
        key: "semantic-search",
        mockup: "/scenario-images/Scenario01.png",
        snippetCode: "/Snippet Images/Snippet1.png",
    },
    {
        providers: [providersInDeck[5], providersInDeck[7]],
        key: "hybrid-search",
        mockup: "/scenario-images/Scenario02.png",
        snippetCode: "/Snippet Images/Snippet2.png",
    },
    {
        providers: [providersInDeck[10]],
        key: "visual",
        mockup: "/scenario-images/Scenario05.png",
        snippetCode: "/Snippet Images/Snippet5.png",
    },
    {
        providers: [providersInDeck[4]],
        key: "gen",
        mockup: "/scenario-images/Scenario03.png",
        snippetCode: "/Snippet Images/Snippet3.png",
    },
    {
        providers: [providersInDeck[6], providersInDeck[8]],
        key: "test",
        mockup: "/scenario-images/Scenario04.png",
        snippetCode: "/Snippet Images/Snippet4.png",
    }
];
