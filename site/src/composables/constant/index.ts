import * as V from "./variables";

export type Font = {
  readonly name: string;
  readonly fontFamily?: string;
};

export type ValidPaperSize = keyof typeof V.PAPER_SIZES;

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

  return {
    FONT,
    PAPER,
    RENDER,
    COLOR,
    DEFAULT
  };
};
