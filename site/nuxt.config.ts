import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
import VueI18n from "@intlify/unplugin-vue-i18n/vite";
import { pwa } from "./configs/pwa";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src/",

  modules: [
    "@vueuse/nuxt",
    "@unocss/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "@vite-pwa/nuxt",
    "nuxt-simple-sitemap"
  ],

  css: [
    "@unocss/reset/tailwind.css",
    "katex/dist/katex.min.css",
    "vue-slider-component/dist-css/vue-slider-component.css",
    "vue-slider-component/theme/default.css",
    "vue-toastification/dist/index.css",
    "~/assets/css/index.css"
  ],

  imports: {
    presets: [
      {
        from: "vue-i18n",
        imports: ["useI18n"]
      }
    ]
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false
    }
  ],

  build: {
    transpile: ["vue-i18n"]
  },

  vite: {
    plugins: [
      VueI18n({
        include: [
          resolve(
            dirname(fileURLToPath(import.meta.url)),
            "./src/i18n/translations/*.yaml"
          )
        ],
        strictMessage: false
      })
    ]
  },

  runtimeConfig: {
    public: {
      googleFontsKey: ""
    }
  },

  colorMode: {
    preference: "light",
    classSuffix: ""
  },

  app: {
    head: {
      viewport: "width=device-width,initial-scale=1",
      link: [
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#222" }
      ],
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "application-name", content: "Oh My CV!" },
        { name: "apple-mobile-web-app-title", content: "Oh My CV!" },
        { name: "msapplication-TileColor", content: "#fff" },
        { property: "og:url", content: "https://ohmycv.app" },
        { property: "og:type", content: "website" }
      ]
    }
  },

  site: {
    url: "https://ohmycv.app"
  },

  pwa,

  generate: {
    routes: ["/", "/zh-cn", "/resumes", "/zh-cn/resumes", "/edit", "/zh-cn/edit"]
  },

  devtools: { enabled: true }
});
