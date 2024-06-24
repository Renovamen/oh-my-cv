// Borrowed from https://github.com/vitejs/vite/blob/main/packages/vite/src/client/client.ts

const supportsConstructedSheet = (() => {
  try {
    new CSSStyleSheet();
    return true;
  } catch (e) {}
  return false;
})();

const sheet = undefined as CSSStyleSheet | HTMLStyleElement | undefined;
const sheetMap = {} as { [key: string]: CSSStyleSheet | HTMLStyleElement };

/**
 * Inject CSS into the document.
 *
 * @param cssText A string of CSS to inject.
 * @param id An optional ID to use for the injected CSS. If provided,the CSS will be
 * injected into a <style> element with the given ID. If not provided, the CSS will
 * be injected into the document's <style> element.
 */
export const injectCSS = (cssText: string, id?: string) => {
  let styleSheet = id ? sheetMap[id] : sheet;

  if (supportsConstructedSheet) {
    // Use constructed sheet if supported
    if (styleSheet && !(styleSheet instanceof CSSStyleSheet)) {
      styleSheet = undefined;
    }

    if (!styleSheet) {
      styleSheet = new CSSStyleSheet();
      styleSheet.replaceSync(cssText);
      document.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet];
    } else {
      styleSheet.replaceSync(cssText);
    }
  } else {
    // Use <style> element on browsers that don't support constructed sheet
    if (styleSheet && !(styleSheet instanceof HTMLStyleElement)) {
      styleSheet = undefined;
    }

    if (!styleSheet) {
      styleSheet = document.createElement("style");
      styleSheet.setAttribute("type", "text/css");
      styleSheet.innerHTML = cssText;
      document.head.appendChild(styleSheet);
    } else {
      styleSheet.innerHTML = cssText;
    }
  }
};

export default injectCSS;
