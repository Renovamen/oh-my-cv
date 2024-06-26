import { injectCss } from "@ohmycv/dynamic-css";
import type { ResumeStyles } from "~/composables/stores/style";

const { RENDER } = useConstant();
const PREVIEW_ID = "preview";

/**
 * Service for injecting dynamic CSS into the document.
 *
 * Note: This service will not handle margins, height and width, which should be
 * handled by `vue-smart-pages` package.
 */
export class DynamicCssService {
  constructor() {}

  private _elementId = (id?: string | number) => {
    return `vue-smart-pages-${id ?? PREVIEW_ID}`;
  };

  private _injectedCssId = (type: "toolbar" | "css-editor", id?: string | number) => {
    return `oh-my-cv-${type}-${id ?? PREVIEW_ID}`;
  };

  private themeColor = (id: string, styles: ResumeStyles) => {
    return (
      `#${id} :not(.resume-header-item) > a { color: ${styles.themeColor} }` +
      `#${id} h1, #${id} h2, #${id} h3 { color: ${styles.themeColor} }` +
      `#${id} h2 { border-bottom-color: ${styles.themeColor} }`
    );
  };

  private lineHeight = (id: string, styles: ResumeStyles) => {
    const height = styles.lineHeight;

    return (
      `#${id} p, #${id} li { line-height: ${height.toFixed(2)} }` +
      `#${id} h2, #${id} h3 { line-height: ${(height * 1.154).toFixed(2)} }` +
      `#${id} dl { line-height: ${(height * 1.038).toFixed(2)} }`
    );
  };

  private paragraphSpace = (id: string, styles: ResumeStyles) => {
    return `#${id} h2 { margin-top: ${styles.paragraphSpace}px }`;
  };

  private fontFamily = (id: string, styles: ResumeStyles) => {
    const fontEN = styles.fontEN.fontFamily || styles.fontEN.name;
    const fontCJK = styles.fontCJK.fontFamily || styles.fontCJK.name;
    return `#${id} { font-family: ${fontEN}, ${fontCJK} }`;
  };

  private fontSize = (id: string, styles: ResumeStyles) => {
    return `#${id} { font-size: ${styles.fontSize}px }`;
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
    const elementId = this._elementId(id);

    const css =
      this.fontFamily(elementId, styles) +
      this.fontSize(elementId, styles) +
      this.themeColor(elementId, styles) +
      this.paragraphSpace(elementId, styles) +
      this.lineHeight(elementId, styles) +
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
      css = css.replaceAll(RENDER.PREVIEW_SELECTOR, `#${this._elementId(id)}`);
    }

    injectCss(this._injectedCssId("css-editor", id), css);
  }
}

export const dynamicCssService = new DynamicCssService();
