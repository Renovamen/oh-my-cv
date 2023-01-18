import { defineStore } from "pinia";
import { copy } from "@renovamen/utils";
import { setDynamicCss, DEFAULT_STYLES, resolveGoogleFont } from "~/utils";
import type { ResumeStyles, Font } from "~/types";

export const useStyleStore = defineStore("style", () => {
  const copiedStyles = copy(DEFAULT_STYLES);
  const styles = reactive<ResumeStyles>(copiedStyles);

  const setStyle = <T extends keyof ResumeStyles>(
    key: T,
    value: ResumeStyles[T]
  ) => {
    styles[key] = value;
    // Handle Google Fonts
    if (["fontCJK", "fontEN"].includes(key)) resolveGoogleFont(value as Font);
    // vue-smart-pages will handle margins, height and width
    if (!["marginV", "marginH"].includes(key)) setDynamicCss(styles, "preview");
  };

  return {
    styles,
    setStyle
  };
});
