import { generateNextConfigs } from "@kachkaev/eslint-config-next";
import { defineConfig } from "eslint/config";
import typescriptEslint from "typescript-eslint";

export default defineConfig([
  ...generateNextConfigs({
    tailwindcssEntryPoint: "app/layout/global.css",
  }),

  {
    files: ["cli/**/*.js"],
    extends: [typescriptEslint.configs.disableTypeChecked],
    rules: {
      "@eslint-react/no-implicit-key": "off",
      "@eslint-react/no-unused-props": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
]);
