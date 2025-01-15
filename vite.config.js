import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // La base para tu aplicación
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  build: {
    outDir: "dist", // Directorio de salida
  },
});
