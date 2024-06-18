const { withUnbody } = require("unbody-nextra-plugin");

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

module.exports = withUnbody({
  assistant: {
    name: "unbody.io",
  },
  env: {
    apiKey: "UNBODY_SEARCH_API_KEY",
    sourceId: "UNBODY_SEARCH_SOURCE_ID",
    projectId: "UNBODY_SEARCH_PROJECT_ID",
  },
})(
  withNextra({
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.cdn.unbody.io",
          port: "",
        },
      ],
    },
  })
);
