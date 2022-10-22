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
    ["nav-item", "relative flex-center cursor-pointer space-x-1"],
    ["text-c", "text-gray-600 dark:text-gray-300"],
    ["text-light-c", "text-gray-500 dark:text-gray-400"],
    ["text-lighter-c", "text-gray-400 dark:text-gray-500"],
    ["bg-c", "bg-white dark:bg-gray-700"],
    ["bg-hover-c", "bg-gray-100 dark:bg-gray-600"],
    ["border-c", "border-gray-300 dark:border-gray-500"],
    ["border-dark-c", "border-gray-500 dark:border-gray-400"],
    ["border-darker-c", "border-black dark:border-gray-200"],
    ["shadow-c", "shadow dark:shadow-gray-600"],
    ["dropdown-li", "hstack px-3 h-8 truncate cursor-pointer hover:bg-hover-c"],
    [
      "btn",
      "hstack space-x-1 mt-3 px-2 py-1.5 rounded text-white bg-blue-500 hover:(bg-blue-600 dark:bg-blue-400)"
    ]
  ],
  theme: {
    breakpoints: {
      sm: "640px",
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
