import glsl from "vite-plugin-glsl";

export default {
  root: "src/",
  publicDir: "./public",
  base: "./",
  server: {
    host: true,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
  },
  plugins: [glsl()],
  assetsInclude: ["**.glb"],
};
