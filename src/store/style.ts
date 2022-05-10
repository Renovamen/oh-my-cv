import { defineStore } from "pinia";
import { updateStyles, resolvePageBreak } from "~/utils";
import type { ResumeStyles, Font } from "~/types";

const fontLoader = (fonts: string | Array<string>) => {
  const observers = [];

  for (const font of typeof fonts === "string" ? [fonts] : fonts)
    observers.push(document.fonts.load(`12px ${font}`));

  return Promise.all(observers);
};

export const useStyleStore = defineStore("style", () => {
  const styles = reactive<ResumeStyles>({
    marginV: 45,
    marginH: 45,
    lineHeight: 130,
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
  });

  const setStyle = <T extends keyof ResumeStyles>(
    key: T,
    value: ResumeStyles[T]
  ) => {
    styles[key] = value;
    updateStyles();
    resolvePageBreak();
  };

  const onFontLoaded = () =>
    fontLoader([
      styles.fontEN.fontFamily || styles.fontEN.name,
      styles.fontCN.fontFamily || styles.fontCN.name
    ]);

  const setFont = (key: "fontCN" | "fontEN", value: Font) => {
    styles[key] = value;
    updateStyles();
    onFontLoaded().then(() => setTimeout(() => resolvePageBreak(), 50));
  };

  return {
    styles,
    setStyle,
    setFont,
    onFontLoaded
  };
});
