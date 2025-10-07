import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/index.ts",
        "src/**/main.tsx",
        "src/**/App.tsx",
        "src/**/components/**",
      ],
    },
  },
  resolve: {
    alias: {
      "@app": resolve(dirname(fileURLToPath(import.meta.url)), "src/app"),
      "@widgets": resolve(dirname(fileURLToPath(import.meta.url)), "src/widgets"),
      "@features": resolve(dirname(fileURLToPath(import.meta.url)), "src/features"),
      "@entities": resolve(dirname(fileURLToPath(import.meta.url)), "src/entities"),
      "@shared": resolve(dirname(fileURLToPath(import.meta.url)), "src/shared"),
    },
  },
});



