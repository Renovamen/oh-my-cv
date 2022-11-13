import type { Subset } from "gfonts-loader";
import type { Font } from "~/types";

export const CHROME_PRINT_BOTTOM = 10;

export const THEME_COLORS = [
  "#000000",
  "#377bb5",
  "#ca3832",
  "#ee8732",
  "#9c5bde",
  "#43912b"
];

export const EN_FONTS: Font[] = [
  {
    name: "CMU Sans Serif"
  },
  {
    name: "Times Newer Roman"
  },
  {
    name: "Minion Pro"
  },
  {
    name: "Tex Gyre Pagella"
  }
];

export const CJK_FONTS: Font[] = [
  {
    name: "华康宋体",
    fontFamily: "HKST"
  },
  {
    name: "霞鹜文楷",
    fontFamily: "LXGW WenKai"
  }
];

export const CJK_SUBSETS = [
  "chinese-simplified",
  "chinese-traditional",
  "japanese",
  "korean"
] as Subset[];

export const CJK_NAME_MAP = {
  "Noto Sans SC": "思源黑体（简）",
  "Noto Sans TC": "思源黑体（繁）",
  "Noto Serif SC": "思源宋体（简）",
  "Noto Serif TC": "思源宋体（繁）"
} as Record<string, string>;

export const CJK_FIRST = [
  "思源黑体（简）",
  "思源黑体（繁）",
  "思源宋体（简）",
  "思源宋体（繁）"
];

export const PAPER = {
  A4: {
    h: 297 + 2,
    w: 210
  },
  letter: {
    h: 279.4 + 3,
    w: 215.9
  }
};

export const getPaperPx = (paper: keyof typeof PAPER, v: "h" | "w") =>
  ~~(PAPER[paper][v] * 3.78);

export const getPreviewW = (paper: keyof typeof PAPER) =>
  getPaperPx(paper, "w") + 10;
