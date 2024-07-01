import { fetchFontList, loadFontStylesheet } from "./utils";
import type { Font, FontMap, Options } from "./types";

export class GoogleFontsLoader {
  private readonly apiKey: string;
  private readonly options: Options;
  private activeFontFamily: string; // Name of currently applied font
  private onChange: (font: Font) => void;
  private fontMap: FontMap = new Map<string, Font>(); // Map from font families to font objects

  constructor(
    apiKey: string,
    {
      families = [],
      categories = [],
      subsets = ["latin"],
      variants = ["regular"],
      filter = () => true,
      limit = -1,
      sort = "alphabet"
    }: Options = {},

    onChange: (font: Font) => void = (): void => {}
  ) {
    this.apiKey = apiKey;
    this.options = {
      families,
      categories,
      subsets,
      variants,
      filter,
      limit,
      sort
    };
    this.onChange = onChange;
    this.activeFontFamily = "";
  }

  public async init(): Promise<FontMap> {
    // Load all fonts
    const fonts = await fetchFontList(this.apiKey);

    // Function to check if a font satisfies the filter criteria
    const isFontIncluded = (font: Font) =>
      // Only keep fonts whose names are included in the provided array
      (this.options.families!.length === 0 ||
        this.options.families!.includes(font.family)) &&
      // Only keep fonts in categories from the provided array
      (this.options.categories!.length === 0 ||
        this.options.categories!.includes(font.category)) &&
      // Only keep fonts which are available in all specified subsets
      this.options.subsets!.every((subset) => font.subsets.includes(subset)) &&
      // Only keep fonts which contain all specified variants
      this.options.variants!.every((variant) => font.variants.includes(variant)) &&
      // Only keep fonts for which the `filter` function evaluates to `true`
      this.options.filter!(font) === true;

    // Save desired fonts in the font map
    for (const font of fonts) {
      // Exit once specified limit of number of fonts is reached
      if (this.options.limit! >= 0 && this.fontMap.size >= this.options.limit!) break;
      // Only keep fonts that satisfy the filter criteria
      if (isFontIncluded(font)) this.fontMap.set(font.family, font);
    }

    // Sort the font map if required
    if (this.options.sort === "alphabet") {
      this.fontMap = new Map(
        [...this.fontMap.entries()].sort(([family1], [family2]) =>
          family1.localeCompare(family2)
        )
      );
    }

    return this.fontMap;
  }

  public getFontMap(): FontMap {
    return this.fontMap;
  }

  public getActiveFont(): Font {
    const activeFont = this.fontMap.get(this.activeFontFamily);
    if (!activeFont) {
      throw Error(
        `Cannot get active font: "${this.activeFontFamily}" is not in the font list`
      );
    } else {
      return activeFont;
    }
  }

  /**
   * Set the specified font as the active font and download it
   */
  public async setActiveFont(fontFamily: string) {
    const activeFont = this.fontMap.get(fontFamily);

    if (!activeFont) {
      // Font is not in fontList: Keep current activeFont and log error
      throw Error(`Cannot update active font: "${fontFamily}" is not in the font list`);
    }

    this.activeFontFamily = fontFamily;

    await loadFontStylesheet(activeFont, this.options.subsets!, this.options.variants!);

    this.onChange(activeFont);
  }

  public setOnChange(onChange: (font: Font) => void) {
    this.onChange = onChange;
  }
}

export * from "./types";
export default GoogleFontsLoader;
