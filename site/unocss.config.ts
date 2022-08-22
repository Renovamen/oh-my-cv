import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from "unocss";

export default defineConfig({
  shortcuts: [
    ["flex-center", "flex items-center justify-center"],
    ["hstack", "flex items-center"],
    [
      "nav-item",
      "relative flex-center h-full cursor-pointer space-x-1 whitespace-nowrap"
    ],
    ["text-c", "text-gray-600 dark:text-gray-300"],
    ["text-light-c", "text-gray-500 dark:text-gray-400"],
    ["bg-c", "bg-white dark:bg-gray-700"],
    ["bg-hover-c", "bg-gray-100 dark:bg-gray-600"],
    ["border-c", "border-gray-300 dark:border-gray-500"],
    ["border-dark-c", "border-black dark:border-gray-200"],
    [
      "dropdown-li",
      "hstack space-x-1.5 px-3 h-8 capitalize truncate cursor-pointer hover:bg-hover-c"
    ]
  ],
  theme: {
    breakpoints: {
      pc: "769px"
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetWebFonts({
      fonts: {
        ui: "Lato:400,700",
        logo: "Orbitron:700"
      }
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()]
});
