import { mergeConfig, defineConfig, viteConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [react()],
    test: {
      environment: "jsdom",
      setupFiles: "./setup-tests.ts",
      exclude: ["**/e2e/*"],
    },
  }),
);
