import { injectCSS } from "@renovamen/dynamic-css";
import { getPaperW } from "./constants";
import type { ResumeStyles } from "~/types";

const themeColorCss = (styles: ResumeStyles) => {
  return (
    `.preview :not(.preview-header-item) > a { color: ${styles.themeColor} }` +
    `.preview h1, .preview h2, .preview h3 { color: ${styles.themeColor} }` +
    `.preview h2 { border-bottom-color: ${styles.themeColor} }`
  );
};

const lineHeightCss = (styles: ResumeStyles) => {
  const height = styles.lineHeight;
  return (
    `.preview p, .preview li { line-height: ${height.toFixed(2)} }` +
    `.preview h2, .preview h3 { line-height: ${(height * 1.154).toFixed(2)} }` +
    `.preview dl { line-height: ${(height * 1.038).toFixed(2)} }`
  );
};

const paragraphSpaceCss = (styles: ResumeStyles) => {
  return `.preview h2 { margin-top: ${styles.paragraphSpace}px }`;
};

const fontFamilyCss = (styles: ResumeStyles) => {
  const fontEN = styles.fontEN.fontFamily || styles.fontEN.name;
  const fontCJK = styles.fontCJK.fontFamily || styles.fontCJK.name;
  return `.preview { font-family: ${fontEN}, ${fontCJK} }`;
};

const fontSizeCss = (styles: ResumeStyles) => {
  return `.preview { font-size: ${styles.fontSize}px }`;
};

const paperCss = (styles: ResumeStyles) => {
  return (
    `.preview { width: ${getPaperW(styles.paper)}px }` +
    `@media print { @page { size: ${styles.paper}; } }`
  );
};

export const updateStyles = () => {
  const { styles } = useStyleStore();

  const content =
    fontFamilyCss(styles) +
    fontSizeCss(styles) +
    themeColorCss(styles) +
    paragraphSpaceCss(styles) +
    lineHeightCss(styles) +
    paperCss(styles);

  injectCSS(content, "oh-cv");
};
