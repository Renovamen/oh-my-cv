import { copy } from "@renovamen/utils";
import type { ValidPaperSize, Font } from "~/composables/constant";

export type ResumeStyles = {
  marginV: number;
  marginH: number;
  lineHeight: number;
  paragraphSpace: number;
  themeColor: string;
  fontCJK: Font;
  fontEN: Font;
  fontSize: number;
  paper: ValidPaperSize;
};

export const useStyleStore = defineStore("style", () => {
  const { DEFAULT } = useConstant();

  const copiedStyles = copy(DEFAULT.STYLES);
  const styles = reactive<ResumeStyles>(copiedStyles);

  const setStyle = async <T extends keyof ResumeStyles>(
    key: T,
    value: ResumeStyles[T]
  ) => {
    // handle Google fonts
    if (["fontCJK", "fontEN"].includes(key)) {
      await googleFontsService.resolve(value as Font);
    }

    // update styles for the current resume
    styles[key] = value;

    // update CSS
    // vue-smart-pages will handle margins, height and width
    if (!["marginV", "marginH"].includes(key)) setDynamicCss(styles, "preview");
  };

  return {
    styles,
    setStyle
  };
});
