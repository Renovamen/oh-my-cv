export const SUPPORT_LOCALES = {
  en: {
    name: "English",
    icon: "icon-park-outline:english"
  },
  "zh-CN": {
    name: "中文",
    icon: "icon-park-outline:chinese"
  }
};

export type LocaleType = keyof typeof SUPPORT_LOCALES;
