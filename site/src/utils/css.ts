import { injectCss } from "@ohmycv/dynamic-css";
import { useConstant } from "~/composables/constant";
import type { ResumeStyles } from "~/composables/stores/style";

const { RENDER } = useConstant();

/**
 * Service for injecting dynamic CSS into the document.
 *
 * Note: This service will not handle margins, height and width, which should be
 * handled by the `vue-smart-pages` package.
 */
export class DynamicCssService {
  constructor() {}

  private _selector = (id?: string | number) => {
    return `#resume-${id ?? RENDER.PREVIEW_ID}`;
  };

  private _injectedCssId = (type: "toolbar" | "css-editor", id?: string | number) => {
    return `ohmycv-${type}-${id ?? RENDER.PREVIEW_ID}`;
  };

  private themeColor = (selector: string, styles: ResumeStyles) => {
    return (
      `${selector} :not(.resume-header-item) > a { color: ${styles.themeColor}; }` +
      `${selector} h1, ${selector} h2, ${selector} h3 { color: ${styles.themeColor}; }` +
      `${selector} h2 { border-bottom-color: ${styles.themeColor}; }`
    );
  };

  private lineHeight = (selector: string, styles: ResumeStyles) => {
    const height = styles.lineHeight;

    return (
      `${selector} p, ${selector} li { line-height: ${height.toFixed(2)}; }` +
      `${selector} h2, ${selector} h3 { line-height: ${(height * 1.154).toFixed(2)}; }` +
      `${selector} dl { line-height: ${(height * 1.038).toFixed(2)}; }`
    );
  };

  private paragraphSpace = (selector: string, styles: ResumeStyles) => {
    return `${selector} h2 { margin-top: ${styles.paragraphSpace}px; }`;
  };

  private fontFamily = (selector: string, styles: ResumeStyles) => {
    const fontEN = styles.fontEN.fontFamily || styles.fontEN.name;
    const fontCJK = styles.fontCJK.fontFamily || styles.fontCJK.name;
    return `${selector} { font-family: ${fontEN}, ${fontCJK}, Arial, Helvetica, sans-serif; }`;
  };

  private fontSize = (selector: string, styles: ResumeStyles) => {
    return `${selector} { font-size: ${styles.fontSize}px; }`;
  };

  private paperSize = (styles: ResumeStyles) => {
    return `@media print { @page { size: ${styles.paper}; } }`;
  };

  /**
   * Inject CSS that controlled by the toolbar into the document.
   *
   * @param styles Resume styles
   * @param id Element ID of the corresponding resume element (dashboard). If not
   * provided, it will be set to "preview", which is the preview view in the editor.
   */
  public injectToolbar(styles: ResumeStyles, id?: string | number) {
    const selector = this._selector(id);

    const css =
      this.fontFamily(selector, styles) +
      this.fontSize(selector, styles) +
      this.themeColor(selector, styles) +
      this.paragraphSpace(selector, styles) +
      this.lineHeight(selector, styles) +
      // We only need to set paper size for the preview view in the editor
      (id === undefined ? this.paperSize(styles) : "");

    injectCss(this._injectedCssId("toolbar", id), css);
  }

  /**
   * Inject CSS that controlled by the CSS editor into the document.
   *
   * @param css CSS string
   * @param id Element ID of the corresponding resume element (dashboard). If not
   * provided, it will be set to "preview", which is the preview view in the editor.
   */
  public injectCssEditor(css: string, id?: string | number) {
    if (id !== undefined) {
      // To control each resume element (dashboard) separately
      css = css.replaceAll(RENDER.PREVIEW_SELECTOR, this._selector(id));
    }

    injectCss(this._injectedCssId("css-editor", id), css);
  }
}

export const dynamicCssService = new DynamicCssService();
