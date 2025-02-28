import { defineConfig } from "vite";
import { config } from "dotenv";
import react from "@vitejs/plugin-react";
import path from "path";

config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@assets": `${path.resolve(__dirname, "./src/assets/")}`,
      "@components": `${path.resolve(__dirname, "./src/components/")}`,
      "@pages": `${path.resolve(__dirname, "./src/pages/")}`,
      "@services": `${path.resolve(__dirname, "./src/services/")}`,
      "@styles": `${path.resolve(__dirname, "./src/styles/")}`,
      "@utils": `${path.resolve(__dirname, "./src/utils/")}`,
      "@hooks": `${path.resolve(__dirname, "./src/hooks/")}`,
      "@routes": `${path.resolve(__dirname, "./src/routes/")}`,
      "@contexts": `${path.resolve(__dirname, "./src/contexts/")}`,
      "@themes": `${path.resolve(__dirname, "./src/themes/")}`,
      "@libs": `${path.resolve(__dirname, "./src/libs/")}`,
      "@env": `${path.resolve(__dirname, "./src/env/")}`,
      "@dtos": `${path.resolve(__dirname, "./src/dtos/")}`,
      "@storage": `${path.resolve(__dirname, "./src/storage/")}`,
      "@errors": `${path.resolve(__dirname, "./src/errors/")}`,
    },
  },
});
