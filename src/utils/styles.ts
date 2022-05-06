import { CHROME_PRINT_BOTTOM } from "./constants";
import type { ResumeStyles } from "../types";

let styleSheet = undefined;

const pageMarginCss = (state: ResumeStyles) => {
  const bottom = Math.max(state.marginV - 10, CHROME_PRINT_BOTTOM);
  return `.preview-page { padding: ${state.marginV}px ${state.marginH}px ${bottom}px }`;
};

const themeColorCss = (state: ResumeStyles) => {
  return (
    `.preview a:not(.preview-header-link) { color: ${state.themeColor} }` +
    `.preview h1, .preview h2, .preview h3 { color: ${state.themeColor} }` +
    `.preview h2 { border-bottom-color: ${state.themeColor} }`
  );
};

const lineHeightCss = (state: ResumeStyles) => {
  const lineHeight = state.lineHeight / 100;
  return (
    `.preview p, .preview li { line-height: ${lineHeight.toFixed(2)} }` +
    `.preview h2, .preview h3 { line-height: ${(lineHeight * 1.154).toFixed(
      2
    )} }` +
    `.preview dl { line-height: ${(lineHeight * 1.038).toFixed(2)} }`
  );
};

const paragraphSpaceCss = (state: ResumeStyles) => {
  return `.preview h2 { margin-top: ${state.paragraphSpace}px }`;
};

const fontFamilyCss = (state: ResumeStyles) => {
  const fontEN = state.fontEN.fontFamily || state.fontEN.name;
  const fontCN = state.fontCN.fontFamily || state.fontCN.name;
  return `.preview { font-family: ${fontEN}, ${fontCN} }`;
};

const fontSizeCss = (state: ResumeStyles) => {
  return `.preview { font-size: ${state.fontSize}px }`;
};

// Copied from https://github.com/vitejs/vite/blob/main/packages/vite/src/client/client.ts
const supportsConstructedSheet = (() => {
  try {
    new CSSStyleSheet();
    return true;
  } catch (e) {}
  return false;
})();

// Borrowed from https://github.com/vitejs/vite/blob/main/packages/vite/src/client/client.ts
export const updateStyles = (state: ResumeStyles) => {
  const content =
    pageMarginCss(state) +
    fontFamilyCss(state) +
    fontSizeCss(state) +
    themeColorCss(state) +
    paragraphSpaceCss(state) +
    lineHeightCss(state);

  if (supportsConstructedSheet) {
    // Use constructed sheet if supported
    if (styleSheet && !(styleSheet instanceof CSSStyleSheet)) {
      styleSheet = undefined;
    }

    if (!styleSheet) {
      styleSheet = new CSSStyleSheet();
      styleSheet.replaceSync(content);
      // @ts-expect-error: using experimental API
      document.adoptedStyleSheets = [
        // @ts-expect-error: using experimental API
        ...document.adoptedStyleSheets,
        styleSheet
      ];
    } else {
      styleSheet.replaceSync(content);
    }
  } else {
    // Use <style> element on browsers that don't support constructed sheet
    if (styleSheet && !(styleSheet instanceof HTMLStyleElement)) {
      styleSheet = undefined;
    }

    if (!styleSheet) {
      styleSheet = document.createElement("style");
      styleSheet.setAttribute("type", "text/css");
      styleSheet.innerHTML = content;
      document.head.appendChild(styleSheet);
    } else {
      styleSheet.innerHTML = content;
    }
  }
};
