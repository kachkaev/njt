import { generateNextConfigs } from "@kachkaev/eslint-config-next";
import type { Linter } from "eslint";
import { defineConfig } from "eslint/config";
import typescriptEslint from "typescript-eslint";

const sharedFileScope = "**/*.{ts,tsx}";
const cliFileScope = "cli/**/*.js";

/**
 * The shared configs are scoped to TS and TSX. The CLI is plain JavaScript, so widen that scope to
 * cover it as well (https://github.com/kachkaev/reusable-stuff/issues/348).
 */
function includeCli(config: Linter.Config): Linter.Config {
  return Array.isArray(config.files) &&
    config.files.length === 1 &&
    config.files[0] === sharedFileScope
    ? { ...config, files: [sharedFileScope, cliFileScope] }
    : config;
}

export default defineConfig([
  generateNextConfigs({
    tailwindcssEntryPoint: "app/layout/global.css",
  }).map((config) => includeCli(config)),

  {
    files: [cliFileScope],
    extends: [typescriptEslint.configs.disableTypeChecked],
    rules: {
      "@eslint-react/no-implicit-key": "off",
      "@eslint-react/no-unused-props": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
]);
