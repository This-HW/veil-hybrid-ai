import { defineConfig } from "vite";

// `base` is set from the command line for the GitHub Pages build.
export default defineConfig({
  base: process.env.VITE_BASE ?? "/",
  build: {
    target: "es2022",
    sourcemap: true,
  },
});
