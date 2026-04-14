export const siteConfig = {
  name: "Unbody",
  tagline: "Adaptive thinking tools",
  description:
    "Unbody Lab builds adaptive thinking tools and explores AI's role in augmenting human cognition.",
  url: "https://unbody.io",
  social: {
    twitter: "unbaborning",
    github: "unbody-io",
  },
  pages: {
    blog: {
      title: "Unbody Blog",
      description:
        "Insights on AI-native development, modular backends, and adaptive thinking tools from the Unbody team.",
    },
    lab: {
      title: "Unbody Lab",
      description:
        "Where we question, explore, experiment and build adaptive thinking tools.",
    },
  },
} as const;

export type PageKey = keyof typeof siteConfig.pages;
