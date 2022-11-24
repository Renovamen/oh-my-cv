import { defineStore } from "pinia";
import { copy } from "@renovamen/utils";
import GoogleFontsLoader, {
  type Font as GoogleFont,
  Subset
} from "gfonts-loader";
import {
  updateStyles,
  DEFAULT_STYLES,
  EN_FONTS,
  CJK_FONTS,
  CJK_SUBSETS,
  IGNORE_FONTS
} from "~/utils";
import type { ResumeStyles, Font } from "~/types";

const fontLoader = (fonts: string | Array<string>) => {
  const observers = [];

  for (const font of typeof fonts === "string" ? [fonts] : fonts)
    observers.push(document.fonts.load(`12px ${font}`));

  return Promise.all(observers);
};

const isPredefinedFont = (font: Font) => {
  const check = (list: Font[]) =>
    list.some(
      (item) =>
        (item.fontFamily || item.name) === (font.fontFamily || font.name)
    );
  return check(EN_FONTS) || check(CJK_FONTS);
};

export const useStyleStore = defineStore("style", () => {
  const copiedStyles = copy(DEFAULT_STYLES);
  const styles = reactive<ResumeStyles>(copiedStyles);

  const key = import.meta.env.VITE_GOOGLE_FONTS_KEY;
  const gLoader = key
    ? new GoogleFontsLoader(key, {
        variants: ["regular", "700"],
        filter: (font: GoogleFont) => !IGNORE_FONTS.includes(font.family)
      })
    : null;

  const initGLoader = async () => {
    if (gLoader && !gLoader.getFontMap().size) await gLoader.init();
  };

  const setStyle = <T extends keyof ResumeStyles>(
    key: T,
    value: ResumeStyles[T]
  ) => {
    styles[key] = value;

    // Handle Google Fonts
    if (
      ["fontCJK", "fontEN"].includes(key) &&
      !isPredefinedFont(value as Font) &&
      gLoader
    ) {
      const font = value as Font;
      initGLoader().then(() => {
        gLoader.setActiveFont(font.fontFamily || font.name);
      });
    }

    // vue-smart-pages will handle margins, height and width
    if (!["marginV", "marginH"].includes(key)) updateStyles();
  };

  const getGoogleFonts = async () => {
    if (!gLoader)
      return {
        gfonts_en: [],
        gfonts_cjk: []
      };

    await initGLoader();

    const gfonts = gLoader.getFontMap();
    const gfonts_en = [] as GoogleFont[],
      gfonts_cjk = [] as GoogleFont[];

    for (const k of gfonts.keys()) {
      const font = gfonts.get(k)!;

      if (CJK_SUBSETS.some((subset: Subset) => font.subsets.includes(subset))) {
        gfonts_cjk.push(font);
      } else {
        gfonts_en.push(font);
      }
    }

    return {
      gfonts_en,
      gfonts_cjk
    };
  };

  const onFontLoaded = () =>
    fontLoader([
      styles.fontEN.fontFamily || styles.fontEN.name,
      styles.fontCJK.fontFamily || styles.fontCJK.name
    ]);

  return {
    styles,
    setStyle,
    onFontLoaded,
    getGoogleFonts
  };
});
