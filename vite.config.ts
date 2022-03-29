import vue from "@vitejs/plugin-vue";
import windicss from "vite-plugin-windicss";
import path from "path";

export default {
  plugins: [vue(), windicss()],
  publicDir: "public",
  optimizeDeps: {},
  server: {
    host: "0.0.0.0"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
};
