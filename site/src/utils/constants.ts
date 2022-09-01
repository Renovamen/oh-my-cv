import type { Font, ResumeStyles } from "~/types";

export const CHROME_PRINT_BOTTOM = 10;

export const DEFAULT_NAME = "New Resume";

export const DEFAULT_STYLES = {
  marginV: 50,
  marginH: 45,
  lineHeight: 1.3,
  paragraphSpace: 5,
  themeColor: "#377bb5",
  fontCN: {
    name: "思源黑体",
    fontFamily: "Noto Sans SC"
  },
  fontEN: {
    name: "CMU Sans Serif"
  },
  fontSize: 15,
  paper: "A4"
} as ResumeStyles;

export const DEFAULT_THEME_COLORS = [
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
  }
];

export const CN_FONTS: Font[] = [
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
