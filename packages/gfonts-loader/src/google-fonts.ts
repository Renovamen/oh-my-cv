import { Font, Variant, Subset } from "./types";
import { hasStylesheet, createStylesheet } from "./stylesheets";

const GOOGLE_FONTS_API = "https://www.googleapis.com/webfonts/v1/webfonts";
const GOOGLE_FONTS_CSS = "https://fonts.googleapis.com/css";

const get = (url: string): Promise<string> => {
  return new Promise((resolve, reject): void => {
    const request = new XMLHttpRequest();

    request.overrideMimeType("application/json");
    request.open("GET", url, true);

    request.onreadystatechange = (): void => {
      if (request.readyState === 4) {
        if (request.status !== 200) {
          reject(new Error(`Response has status code ${request.status}`));
        } else {
          resolve(request.responseText);
        }
      }
    };
    request.send();
  });
};

const getFontStylesheet = async (
  fonts: Font[],
  subsets: Subset[],
  variants: Variant[]
): Promise<string> => {
  const url = new URL(GOOGLE_FONTS_CSS);

  const variantsStr = variants.join(",");
  const familiesStr = fonts.map(
    (font): string => `${font.family}:${variantsStr}`
  );

  url.searchParams.append("family", familiesStr.join("|"));
  url.searchParams.append("subset", subsets.join(","));
  // Tell browser to render fallback font immediately and swap in the new font once it's loaded
  url.searchParams.append("font-display", "swap");

  return get(url.href);
};

const getFontId = (fontFamily: string): string => {
  return fontFamily.replace(/\s+/g, "-").toLowerCase();
};

export const loadFontList = async (apiKey: string): Promise<Font[]> => {
  // Request list of all Google Fonts, sorted by popularity
  const url = new URL(GOOGLE_FONTS_API);

  url.searchParams.append("sort", "popularity");
  url.searchParams.append("key", apiKey);

  const response = await get(url.href);
  const fonts = JSON.parse(response).items;

  // Generate fontId for each font
  return fonts.map((font: Font): Font => {
    const { family, ...others } = font;
    return {
      ...others,
      family,
      id: getFontId(family)
    };
  });
};

export const loadFont = async (
  font: Font,
  subsets: Subset[],
  variants: Variant[]
) => {
  if (!hasStylesheet(font.id)) {
    // Only load font if it doesn't have a stylesheet yet
    const fontStyle = await getFontStylesheet([font], subsets, variants);
    createStylesheet(font.id, fontStyle);
  }
};
