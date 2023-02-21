import { injectCSS } from "@renovamen/dynamic-css";
import { PREVIEW_SELECTOR } from "~/utils";
import type { ResumeStyles } from "~/types";

const themeColorCss = (styles: ResumeStyles, id: string) => {
  return (
    `#${id} :not(.resume-header-item) > a { color: ${styles.themeColor} }` +
    `#${id} h1, #${id} h2, #${id} h3 { color: ${styles.themeColor} }` +
    `#${id} h2 { border-bottom-color: ${styles.themeColor} }`
  );
};

const lineHeightCss = (styles: ResumeStyles, id: string) => {
  const height = styles.lineHeight;
  return (
    `#${id} p, #${id} li { line-height: ${height.toFixed(2)} }` +
    `#${id} h2, #${id} h3 { line-height: ${(height * 1.154).toFixed(2)} }` +
    `#${id} dl { line-height: ${(height * 1.038).toFixed(2)} }`
  );
};

const paragraphSpaceCss = (styles: ResumeStyles, id: string) => {
  return `#${id} h2 { margin-top: ${styles.paragraphSpace}px }`;
};

const fontFamilyCss = (styles: ResumeStyles, id: string) => {
  const fontEN = styles.fontEN.fontFamily || styles.fontEN.name;
  const fontCJK = styles.fontCJK.fontFamily || styles.fontCJK.name;
  return `#${id} { font-family: ${fontEN}, ${fontCJK} }`;
};

const fontSizeCss = (styles: ResumeStyles, id: string) => {
  return `#${id} { font-size: ${styles.fontSize}px }`;
};

const paperCss = (styles: ResumeStyles) => {
  return `@media print { @page { size: ${styles.paper}; } }`;
};

export const setDynamicCss = (styles: ResumeStyles, id: string) => {
  const pageId = `vue-smart-pages-${id}`;

  const content =
    fontFamilyCss(styles, pageId) +
    fontSizeCss(styles, pageId) +
    themeColorCss(styles, pageId) +
    paragraphSpaceCss(styles, pageId) +
    lineHeightCss(styles, pageId) +
    (id === "preview" ? paperCss(styles) : "");

  injectCSS(content, `oh-my-cv-dynamic-${id}`);
};

export const setBackboneCss = (css: string, id: string) => {
  if (id !== "preview")
    css = css.replaceAll(PREVIEW_SELECTOR, `#vue-smart-pages-${id}`);

  injectCSS(css, `oh-my-cv-backbone-${id}`);
};
