import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Sert le mini-playground de visualisation des composants (`yarn dev`).
// Le build de la librairie reste géré par tsc, pas par Vite.
export default defineConfig({
  root: "playground",
  plugins: [react()],
});
