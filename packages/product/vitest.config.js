import { mergeConfig, defineConfig, viteConfig } from "vitest/config";

export default mergeConfig(viteConfig, defineConfig({}));
