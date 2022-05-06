import vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";
import path from "path";

export default {
  plugins: [vue(), Unocss()],
  publicDir: "public",
  optimizeDeps: {},
  server: {
    host: "0.0.0.0"
  },
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`
    }
  }
};
