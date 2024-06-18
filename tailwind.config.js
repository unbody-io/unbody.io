/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./containers/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/unbody-nextra-ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border_color: "#9B94AA",
        gradient_color1: "#FF3BFF",
        gradient_color2: "#ECBFBF",
        gradient_color3: "#5C24FF",
        gradient_color4: "#D94FD5",
        paraghraph_gray: "#A0A0A0",
        border_gray: "#979797",
      },
    },
  },
  plugins: [nextui()],
};
