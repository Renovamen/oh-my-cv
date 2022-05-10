import { useStyleStore } from "~/store";
import { handlePageBreak } from "~/utils";
import type { Font } from "~/types";

export const fontLoader = (fonts: string | Array<string>) => {
  const observers = [];

  for (const font of typeof fonts === "string" ? [fonts] : fonts)
    observers.push(document.fonts.load(`12px ${font}`));

  return Promise.all(observers);
};

export const resolveFonts = () => {
  const { styles, setStyle } = useStyleStore();

  const fontFamilyEN = computed(
    () => styles.fontEN.fontFamily || styles.fontEN.name
  );
  const fontFamilyCN = computed(
    () => styles.fontCN.fontFamily || styles.fontCN.name
  );

  const onFontLoaded = computed(() =>
    fontLoader([fontFamilyEN.value, fontFamilyCN.value])
  );

  const toggleFont = (lang: "fontCN" | "fontEN", font: Font) => {
    setStyle(lang, font);
    onFontLoaded.value.then(() => handlePageBreak());
  };

  return {
    fontFamilyEN,
    fontFamilyCN,
    onFontLoaded,
    toggleFont
  };
};
