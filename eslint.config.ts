import { generateNextConfigs } from "@kachkaev/eslint-config-next";
import { defineConfig } from "eslint/config";
import typescriptEslint from "typescript-eslint";

export default defineConfig([
  ...generateNextConfigs(),

  {
    files: ["cli/**/*.js"],
    extends: [typescriptEslint.configs.disableTypeChecked],
    rules: {
      "@eslint-react/no-unused-props": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },

  // TODO: Remove after migrating to app router
  {
    files: ["pages/**/*.page.tsx", "pages/**/*.handler.ts"],
    rules: {
      "import/no-default-export": "off",
    },
  },

  // TODO: Triage
  {
    rules: {
      "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "off",
      "@eslint-react/no-array-index-key": "off",
      "@eslint-react/no-unused-props": "off",
      "@typescript-eslint/consistent-type-assertions": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/prefer-regexp-exec": "off",
    },
  },
]);
