import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from "unocss";

export default defineConfig({
  shortcuts: [
    ["flex-center", "flex items-center justify-center"],
    [
      "btn",
      "flex items-center justify-center h-7 sm:h-8 rounded cursor-pointer"
    ],
    [
      "menu-li",
      "flex items-center space-x-0.5 sm:space-x-1.5 px-3 h-8 text-sm cursor-pointer bg-transparent hover:bg-gray-100 dark:hover:bg-dark-200"
    ]
  ],
  presets: [presetUno(), presetAttributify()],
  transformers: [transformerDirectives(), transformerVariantGroup()]
});
