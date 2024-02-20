export const notionPageIds = {
    LANDING: "d2e65bc70aa94e3589556730f7415dad",
    FEATURES: "a4c32d3548e64215868deea16a5d7f0d",
    PROVIDERS: "ef7cd27b221a4f1daceeefbc85bf8339",
    FILES: "929760e397794edeb7b6f18d1b6abb3f",
    FOOTER: "9e27276c6d314d4189085e0eefc28e00",
    USECASES: "3d11c1261c2340feadd003f1dd723e3d",
    BLOGPOSTS: "65ab0c40507c492998fa8fa54c9b53ae",
    SINGLEPAGES: "04706c04635a40eaaf6786d212eada05",
    DOCS: "Docs-931ad0bba2634a229bafa62c5b8d942a"
}

export const isDev =
    process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

export const AppConfig = {
    site_name: 'Unbody',
    title: `Custom A.I., Custom Data, One API.`,
    description: 'Struggling with fragmented data and complex AI stack? Cut through the noise with Unbody\'s API. Choose your AI, connect your data, and build with ease.',
    siteUrl: "https://unbody.io",
    image: "https://unbody.io/unbody.jpg"
};
