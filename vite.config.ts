import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Carrega variáveis de ambiente baseadas no modo
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    define: {
      global: {},
      "process.env": env,
    },
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
  };
});
