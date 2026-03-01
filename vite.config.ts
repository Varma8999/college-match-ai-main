import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor splits
          if (id.includes("node_modules")) {
            if (id.includes("react")) {
              return "vendor-react";
            }
            if (id.includes("radix-ui") || id.includes("@radix-ui")) {
              return "vendor-radix";
            }
            if (id.includes("sonner") || id.includes("framer-motion")) {
              return "vendor-ui";
            }
            return "vendor-other";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
