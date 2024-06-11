import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//import fs from "fs";
//import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
  },
  plugins: [react()],
  server: {
    port: 3000,
    /* https: {
      key: fs.readFileSync(path.resolve(__dirname, "server.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "server.crt")),
    }, */
    host: "0.0.0.0",
  },
});
