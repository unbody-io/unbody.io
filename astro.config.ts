import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import astroOpenGraphImages from "astro-opengraph-images";
import { readFileSync } from "node:fs";
import rehypeExternalLinks from "rehype-external-links";
import renderOgImage from "./src/og-image";

const geistPixelSquare = readFileSync("public/fonts/geist-pixel-square.ttf");

export default defineConfig({
  site: "https://unbody.io",
  output: "static",
  integrations: [
    react(),
    mdx(),
    sitemap(),
    astroOpenGraphImages({
      options: {
        fonts: [
          {
            name: "Geist Pixel Square",
            weight: 500,
            style: "normal",
            data: geistPixelSquare,
          },
          {
            name: "PX Grotesk Mono",
            weight: 400,
            style: "normal",
            data: readFileSync("public/fonts/px-grotesk-mono-400.otf"),
          },
          {
            name: "MD System Mono",
            weight: 400,
            style: "normal",
            data: readFileSync("public/fonts/md-system-mono-400.otf"),
          },
        ],
        width: 1200,
        height: 900,
      },
      render: renderOgImage,
    }),
  ],
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        limitInputPixels: false,
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ["@resvg/resvg-js"],
    },
  },
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
    ],
  },
});
