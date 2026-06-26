import { readFileSync } from "node:fs";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf-8"));

// Sert et build le mini-playground de visualisation des composants
// (`yarn dev` en local, `yarn build:playground` pour GitHub Pages).
// Le build de la LIBRAIRIE reste géré par tsc, pas par Vite.
export default defineConfig(({ command }) => ({
  root: "playground",
  // Sur GitHub Pages, le site est servi sous /react-component/
  base: command === "build" ? "/react-component/" : "/",
  plugins: [react()],
  // Injecte la version (package.json) et la date de build dans le playground.
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
  build: {
    // Sort de playground/ pour ne pas mélanger avec les sources
    outDir: "../playground-dist",
    emptyOutDir: true,
  },
}));
