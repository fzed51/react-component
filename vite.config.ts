import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Sert et build le mini-playground de visualisation des composants
// (`yarn dev` en local, `yarn build:playground` pour GitHub Pages).
// Le build de la LIBRAIRIE reste géré par tsc, pas par Vite.
export default defineConfig(({ command }) => ({
  root: "playground",
  // Sur GitHub Pages, le site est servi sous /react-component/
  base: command === "build" ? "/react-component/" : "/",
  plugins: [react()],
  build: {
    // Sort de playground/ pour ne pas mélanger avec les sources
    outDir: "../playground-dist",
    emptyOutDir: true,
  },
}));
