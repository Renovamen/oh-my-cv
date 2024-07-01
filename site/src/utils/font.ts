import GoogleFontsLoader from "@ohmycv/google-fonts-loader";
import type { Font as GoogleFont, Subset } from "@ohmycv/google-fonts-loader";
import { useConstant, type Font } from "~/composables/constant";
import type { ResumeStyles } from "~/composables/stores/style";

const { FONT } = useConstant();

export class GoogleFontsService {
  private _loader: GoogleFontsLoader | null;

  constructor() {
    this._loader = null;
  }

  public includes = (font: Font) => !FONT.LOCAL.includes(font);

  /**
   * Whether the font is a CJK Google Font
   *
   * @param font Google Font
   * @returns True if the font is a CJK Google Font, false otherwise
   */
  public isCJK = (font: GoogleFont) =>
    FONT.GF.CJK_SUBSETS.some((subset: Subset) => font.subsets.includes(subset));

  /**
   * Load Google Fonts, if not already loaded
   * @returns GoogleFontsLoader instance if successful, null otherwise
   */
  public async loader() {
    const config = useRuntimeConfig();
    const key = config.public.googleFontsKey;

    if (!this._loader && key !== "") {
      this._loader = new GoogleFontsLoader(key, {
        variants: ["regular", "700"],
        filter: (font: GoogleFont) => !FONT.GF.IGNORE.includes(font.family)
      });
      await this._loader.init();
    }

    return this._loader;
  }

  /**
   * If the font is a Google Font, set it as active and download it
   */
  public async resolve(font: Font) {
    if (this.includes(font)) {
      const loader = await this.loader();

      if (loader) {
        await loader.setActiveFont(font.fontFamily || font.name);
      }
    }
  }

  /**
   * Get all available Google Fonts, separated by EN and CJK
   * @returns List of EN and CJK Google Fonts
   */
  public async get() {
    const loader = await this.loader();

    const en: GoogleFont[] = [];
    const cjk: GoogleFont[] = [];

    if (loader) {
      const fonts = loader.getFontMap();

      fonts.forEach((font) => {
        this.isCJK(font) ? cjk.push(font) : en.push(font);
      });
    }

    return {
      en,
      cjk
    };
  }

  /**
   * Font monitor, it will notify when the font is loaded
   *
   * @param fonts Font or a list of fonts to monitor
   * @returns A promise, fulfilled when when all the fonts are loaded, or rejected if any
   * of the fonts fail to load
   */
  public observer(fonts: string | Array<string>) {
    const observers = [];

    for (const font of typeof fonts === "string" ? [fonts] : fonts)
      observers.push(document.fonts.load(`12px ${font}`));

    return Promise.all(observers);
  }

  /**
   * Notify when the fonts used in the resume styles are loaded
   *
   * @param styles Resume styles
   * @see {@link observer}
   */
  public presetObserver(styles: ResumeStyles) {
    return this.observer([
      styles.fontEN.fontFamily || styles.fontEN.name,
      styles.fontCJK.fontFamily || styles.fontCJK.name
    ]);
  }
}

export const googleFontsService = new GoogleFontsService();
