import { defineStore } from "pinia";
import { onStylesUpdate } from "~/utils";
import type { ResumeStyles } from "~/types";

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

    if (key === "fontEN" || key === "fontCN")
      onStylesUpdate(false); // Should handle page break after loading font
    else onStylesUpdate();
  };

  return {
    styles,
    setStyle
  };
});
