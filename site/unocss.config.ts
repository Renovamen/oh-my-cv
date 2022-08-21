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
    ["border-c", "border-gray-300 dark:border-gray-600"],
    [
      "dropdown-li",
      "hstack space-x-1.5 px-3 h-8 capitalize truncate cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-200"
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
        ui: "Lato:400,700"
      }
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()]
});
