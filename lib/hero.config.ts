
export const providersInDeck = [
    {
        name: "Telegram-dummy",
        image: "/Provider Icons/Telegram.svg",
    },
    {
        name: "Finder-dummy",
        image: "/Provider Icons/Finder.svg",
    },
    {
        name: "Slack",
        image: "/Provider Icons/Slack.svg",
    },
    {
        name: "Notion",
        image: "/Provider Icons/Notion.svg",
    },
    {
        name: "Discord",
        image: "/Provider Icons/Discord.svg",
    },
    {
        name: "Drive",
        image: "/Provider Icons/Drive.svg",
    },
    {
        name: "Calander",
        image: "/Provider Icons/Calander.svg",
    },
    {
        name: "Dropbox",
        image: "/Provider Icons/Dropbox.svg",
    },
    {
        name: "Github",
        image: "/Provider Icons/Github.svg",
    },
    {
        name: "Gmail",
        image: "/Provider Icons/Gmail.svg",
    },
    {
        name: "Finder",
        image: "/Provider Icons/Finder.svg",
    },
    {
        name: "Telegram",
        image: "/Provider Icons/Telegram.svg",
    },
    {
        name: "Slack",
        image: "/Provider Icons/Slack.svg",
    },
];




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
