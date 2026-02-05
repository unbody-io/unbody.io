import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import rehypeExternalLinks from "rehype-external-links";

export default defineConfig({
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
    ],
  },
});
