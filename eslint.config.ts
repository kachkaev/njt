import { generateNextConfigs } from "@kachkaev/eslint-config-next";
import { defineConfig } from "eslint/config";
import typescriptEslint from "typescript-eslint";

export default defineConfig([
  ...generateNextConfigs({
    tailwindcssEntryPoint: "pages/_app.page/global.css",
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
    files: ["pages/_document.page.tsx"],
    rules: {
      // `no-js` is swapped for `js` on <body> in pages/_app.page.tsx. Neither is
      // a utility – `js` only exists as a custom variant in global.css.
      "better-tailwindcss/no-unknown-classes": ["error", { ignore: ["no-js"] }],
    },
  },

  // TODO: Remove after migrating to app router
  {
    files: ["pages/**/*.page.tsx", "pages/**/*.handler.ts"],
    rules: {
      "import/no-default-export": "off",
    },
  },
]);
