import Vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";
import path from "path";

export default {
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`
    }
  },

  plugins: [Vue(), Unocss()]
};
