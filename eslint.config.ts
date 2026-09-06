import { generateNextConfigs } from "@kachkaev/eslint-config-next";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { ignores: ["cli/dist"] },

  generateNextConfigs({
    tailwindcssEntryPoint: "app/layout/global.css",
  }),

  {
    // Vite requires a default export from its config file
    files: ["cli/vite.config.ts"],
    rules: {
      "import/no-default-export": "off",
    },
  },

  {
    // The CLI is bundled into a single file, so everything it imports except
    // `open` (kept external, see vite.config.ts) is a devDependency by design
    files: ["cli/src/**/*.ts"],
    rules: {
      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    },
  },
]);
