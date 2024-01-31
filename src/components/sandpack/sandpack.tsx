import { Sandpack } from "@codesandbox/sandpack-react";
import { tailwindConfig, postcssConfig, stylesConfig } from "./config-file";

const customSetup = {
  dependencies: {
    "@nextui-org/react": "latest",
    "framer-motion": "^10.12.16",
    autoprefixer: "^10.4.14",
    postcss: "^8.4.21",
    tailwindcss: "^3.2.7",
  },
  devDependencies: {},
};

const configFiles = {
  "tailwind.config.ts": {
    code: tailwindConfig,
    hidden: true,
  },
  "postcss.config.js": {
    code: postcssConfig,
    hidden: true,
  },
  "styles.css": {
    code: stylesConfig,
    hidden: true,
  },
};

export interface CustomSandpackProps {
  codeFiles: Record<string, string>;
}

const CustomSandpack: React.FC<CustomSandpackProps> = ({ codeFiles }) => {
  const files = {
    ...codeFiles,
    ...configFiles,
  };

  return (
    <Sandpack
      files={files}
      template="vite-react-ts"
      customSetup={customSetup}
    />
  );
};

CustomSandpack.displayName = "CustomSandpack";
export default CustomSandpack;
