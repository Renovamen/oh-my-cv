import path from "path";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Pages from "vite-plugin-pages";
import generateSitemap from "vite-ssg-sitemap";
import Layouts from "vite-plugin-vue-layouts";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import VueI18n from "@intlify/unplugin-vue-i18n/vite";
import Unocss from "unocss/vite";

export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`
    }
  },

  plugins: [
    Vue({
      reactivityTransform: true
    }),

    vueJsx(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "vue-i18n",
        "vue/macros",
        "@vueuse/head",
        "@vueuse/core"
      ],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/composables", "src/stores"],
      vueTemplate: true
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      dts: "src/components.d.ts"
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
  ],

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: "async",
    formatting: "minify",
    onFinished: generateSitemap,
    includedRoutes: () => ["/", "/zh-CN/"]
  },

  ssr: {
    noExternal: [
      "splitpanes",
      "vue-toastification",
      "workbox-window",
      /vue-i18n/
    ]
  }
});
