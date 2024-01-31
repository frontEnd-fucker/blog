export const tailwindConfig = `
  import type { Config } from "tailwindcss";
  import { nextui } from "@nextui-org/react";

  const config: Config = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
      },
    },
    plugins: [nextui()],
  };
  export default config;
`;

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
