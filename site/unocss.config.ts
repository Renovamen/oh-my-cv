import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from "unocss";
import { i18n } from "./configs/i18n";
import presetAnimations from "unocss-preset-animations";
import { presetShadcn } from "unocss-preset-shadcn";

export default defineConfig({
  shortcuts: [
    {
      "flex-center": "flex items-center justify-center",
      hstack: "flex items-center",
      "hide-on-mobile": "lt-md:hidden",
      "ring-when-focus":
        "ring-offset-background focus-visible:(outline-none ring-2 ring-ring ring-offset-2)",
      "shadow-c": "shadow shadow-gray-300 dark:shadow-neutral-900",
      "resume-card":
        "relative mx-auto rounded-md duration-150 hover:(-translate-y-3 drop-shadow-xl)"
    }
  ],
  preflights: [
    {
      getCSS: () => `
        :root {
          --success: 142 71% 29%;
          --info: 224 77% 48%;
        }

        .dark {
          --success: 142 76% 40%;
          --info: 209 87% 57%;
        }
      `
    }
  ],
  theme: {
    breakpoints: {
      sm: "641px",
      md: "769px",
      lg: "1025px"
    },
    colors: {
      success: "hsl(var(--success))",
      info: "hsl(var(--info))"
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: "inline-block"
      }
    }),
    presetWebFonts({
      fonts: {
        ui: "Lato:400,700"
      }
    }),
    presetAnimations(),
    presetShadcn(
      {
        color: {
          base: "orange",
          light: {
            background: "0 0% 100%",
            foreground: "215 25% 27%",
            card: "0 0% 100%",
            "card-foreground": "215 25% 27%",
            popover: "0 0% 100%",
            "popover-foreground": "215 25% 27%",
            secondary: "220 13% 91%",
            "secondary-foreground": "220.9 39.3% 11%", // gray
            muted: "220 14.3% 95.9%", // gray
            "muted-foreground": "220 8.9% 46.1%", // gray
            accent: "220 14.3% 95.9%", // gray
            "accent-foreground": "220.9 39.3% 11%", // gray
            border: "216 12% 85%",
            input: "216 12% 85%"
          },
          dark: {
            background: "213 12% 15%",
            foreground: "0 0% 90%",
            card: "213 12% 15%",
            "card-foreground": "0 0% 90%",
            popover: "213 12% 15%",
            "popover-foreground": "0 0% 90%",
            secondary: "230 5% 36%",
            "secondary-foreground": "0 0% 98%", // neutral
            muted: "220 10% 21%",
            "muted-foreground": "0 0% 63.9%", // neutral
            accent: "220 10% 21%",
            "accent-foreground": "0 0% 98%", // neutral
            border: "0 0% 45%",
            input: "0 0% 45%"
          }
        }
      },
      false
    )
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  content: {
    pipeline: {
      // https://github.com/fisand/unocss-preset-shadcn
      include: [/\.ts/, /\.vue$/, /\.vue\?vue/]
    }
  },
  // @ts-expect-error icon is a customized key
  safelist: i18n.locales.map((item) => item.icon)
});
