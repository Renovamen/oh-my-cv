import GoogleFontsLoader, { type Font as GoogleFont, Subset } from "gfonts-loader";
import type { ResumeStyles, Font } from "~/types";

let gLoader: GoogleFontsLoader | undefined;

const isGoogleFont = (font: Font) => {
  const check = (list: Font[]) =>
    list.some(
      (item) => (item.fontFamily || item.name) === (font.fontFamily || font.name)
    );
  return !check(EN_FONTS) && !check(CJK_FONTS);
};

export const googleFontsLoader = async () => {
  const config = useRuntimeConfig();
  const key = config.public.googleFontsKey;

  if (!gLoader && key !== "") {
    gLoader = new GoogleFontsLoader(key, {
      variants: ["regular", "700"],
      filter: (font: GoogleFont) => !IGNORE_FONTS.includes(font.family)
    });
    await gLoader.init();
  }

  return gLoader;
};

export const resolveGoogleFont = async (font: Font) => {
  if (isGoogleFont(font)) {
    const loader = await googleFontsLoader();
    if (loader) {
      await loader.setActiveFont(font.fontFamily || font.name);
    }
  }
};

export const getGoogleFonts = async () => {
  const loader = await googleFontsLoader();

  if (!loader)
    return {
      gfonts_en: [],
      gfonts_cjk: []
    };

  const gfonts = loader.getFontMap();
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

const fontLoader = (fonts: string | Array<string>) => {
  const observers = [];

  for (const font of typeof fonts === "string" ? [fonts] : fonts)
    observers.push(document.fonts.load(`12px ${font}`));

  return Promise.all(observers);
};

export const onFontLoaded = (styles: ResumeStyles) =>
  fontLoader([
    styles.fontEN.fontFamily || styles.fontEN.name,
    styles.fontCJK.fontFamily || styles.fontCJK.name
  ]);
