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

  {
    files: ["app/layout.tsx"],
    rules: {
      // `no-js` is swapped for `js` on <body> in app/layout/js-class-switcher.tsx.
      // Neither is a utility – `js` only exists as a custom variant in global.css.
      "better-tailwindcss/no-unknown-classes": ["error", { ignore: ["no-js"] }],
    },
  },
]);
