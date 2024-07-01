import type { Subset } from "@ohmycv/google-fonts-loader";

export type Font = {
  readonly name: string;
  readonly fontFamily?: string;
};

export const LOCAL_EN_FONTS: Font[] = [
  {
    name: "Adobe Garamond Pro"
  },
  {
    name: "Arial"
  },
  {
    name: "Arial Black"
  },
  {
    name: "Arial Narrow"
  },
  {
    name: "CMU Sans Serif"
  },
  {
    name: "Courier New"
  },
  {
    name: "Euclid"
  },
  {
    name: "Georgia"
  },
  {
    name: "Minion Pro"
  },
  {
    name: "Palatino"
  },
  {
    name: "Tahoma"
  },
  {
    name: "Tex Gyre Pagella"
  },
  {
    name: "Times New Roman"
  },
  {
    name: "Times Newer Roman"
  },
  {
    name: "Trebuchet MS"
  },
  {
    name: "Verdana"
  }
];

export const LOCAL_CJK_FONTS: Font[] = [
  {
    name: "华康宋体",
    fontFamily: "HKST"
  },
  {
    name: "霞鹜文楷",
    fontFamily: "LXGW WenKai"
  }
];

export const GF_CJK_SUBSETS = [
  "chinese-simplified",
  "chinese-traditional",
  "japanese",
  "korean"
] as Subset[];

export const GF_CJK_FAMILY_TO_NAME = {
  "Noto Sans SC": "思源黑体（简）",
  "Noto Sans TC": "思源黑体（繁）",
  "Noto Serif SC": "思源宋体（简）",
  "Noto Serif TC": "思源宋体（繁）"
} as Record<string, string>;

export const GF_CJK_FIRST = [
  "思源黑体（简）",
  "思源黑体（繁）",
  "思源宋体（简）",
  "思源宋体（繁）"
];

export const GF_IGNORE_FONTS = [
  "Baloo 2",
  "Baloo Bhai 2",
  "Baloo Bhaijaan 2",
  "Baloo Bhaina 2",
  "Baloo Chettan 2",
  "Baloo Da 2",
  "Baloo Paaji 2",
  "Baloo Tamma 2",
  "Baloo Tammudu 2",
  "Baloo Thambi 2",
  "Brygada 1918",
  "Exo 2",
  "M PLUS 1",
  "M PLUS 1 Code",
  "M PLUS 1p",
  "M PLUS 2",
  "M PLUS Rounded 1c",
  "Shippori Mincho",
  "Source Sans 3",
  "Source Serif 4"
];
