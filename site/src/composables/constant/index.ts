import * as V from "./variables";
import type { Font, ValidPaperSize, ValidVersion } from "./variables";

export type { Font, ValidPaperSize, ValidVersion };

export const useConstant = () => {
  const FONT = {
    LOCAL: {
      EN: V.LOCAL_EN_FONTS,
      CJK: V.LOCAL_CJK_FONTS,
      includes: (font: Font) => {
        const check = (list: Font[]) =>
          list.some(
            (item) => (item.fontFamily ?? item.name) === (font.fontFamily ?? font.name)
          );
        return check(V.LOCAL_EN_FONTS) || check(V.LOCAL_CJK_FONTS);
      }
    },
    GF: {
      CJK_SUBSETS: V.GF_CJK_SUBSETS,
      CJK_FAMILY_TO_NAME: V.GF_CJK_FAMILY_TO_NAME,
      CJK_FIRST: V.GF_CJK_FIRST,
      IGNORE: V.GF_IGNORE_FONTS
    }
  };

  const PAPER = {
    SIZES: V.PAPER_SIZES,
    MM_TO_PX: V.MM_TO_PX,
    sizeToPx: (size: ValidPaperSize, v: "h" | "w") =>
      ~~(V.PAPER_SIZES[size][v] * V.MM_TO_PX)
  };

  const RENDER = {
    PRINT_BOTTOM: V.PRINT_BOTTOM,
    PREVIEW_ID: V.PREVIEW_ID,
    PREVIEW_SELECTOR: V.PREVIEW_SELECTOR
  };

  const COLOR = {
    PRESET: V.PRESET_COLORS
  };

  const DEFAULT = {
    RESUME_NAME: "New Resume",
    STYLES: V.DEFAULT_STYLES,
    MD_CONTENT: V.DEFAULT_MD_CONTENT,
    CSS_CONTENT: V.DEFAULT_CSS_CONTENT
  };

  const VERSION = {
    CURRENT: V.CURRENT_VERSION,
    EMPTY_FALLBACK: V.EMPTY_VERSION_FALLBACK,
    VERSION_KEY: V.VERSION_STORAGE_KEY,
    REQUIRED_DATA_TYPES: V.REQUIRED_DATA_TYPES,
    VALID: V.VALID_VERSIONS,
    isVersionValid: (version: string) => V.VALID_VERSIONS.includes(version)
  };

  return {
    FONT,
    PAPER,
    RENDER,
    COLOR,
    DEFAULT,
    VERSION
  };
};
