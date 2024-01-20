export const SUPPORT_LOCALES = {
  en: {
    name: "English",
    icon: "i-icon-park-outline:english"
  },
  sp: {
    name: "Spanish",
    icon: "i-material-symbols:language-spanish"
  },
  "zh-cn": {
    name: "简体中文",
    icon: "i-icon-park-outline:chinese"
  }
};

export type LocaleType = keyof typeof SUPPORT_LOCALES;
