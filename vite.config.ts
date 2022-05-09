import Vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";
import VueI18n from "@intlify/vite-plugin-vue-i18n";
import Pages from "vite-plugin-pages";
import path from "path";

export default {
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`
    }
  },

  plugins: [
    Vue(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ["vue"]
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),

    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__dirname, "src/i18n/translations/**")]
    })
  ]
};
