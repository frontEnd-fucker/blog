export const viteConfig = `
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
`;

export const tailwindConfig = `const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      red: "black",
      blue: {
        500: "red",
      },
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};`;

export const tailwindConfig1 = `const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};`;

export const stylesConfig = `
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
`;

export const postcssConfig = `
  module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
`;

export const yarnrcyml = `
  npmRegistryServer: 'https://registry.npmmirror.com'
`;

export const yarnrc = `
  registry "https://registry.npmmirror.com"
`;
