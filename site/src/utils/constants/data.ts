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
  }
];

export const CN_FONTS: Font[] = [
  {
    name: "华康宋体",
    fontFamily: "HKST"
  },
  {
    name: "思源黑体",
    fontFamily: "Noto Sans SC"
  },
  {
    name: "思源宋体",
    fontFamily: "Noto Serif SC"
  },
  {
    name: "霞鹜文楷",
    fontFamily: "LXGW WenKai"
  }
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
