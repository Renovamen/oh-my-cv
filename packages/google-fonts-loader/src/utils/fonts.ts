import type { Font, Variant, Subset } from "../types";
import { hasStylesheet, createStylesheet } from "./stylesheets";

const GOOGLE_FONTS_API = "https://www.googleapis.com/webfonts/v1/webfonts";
const GOOGLE_FONTS_CSS = "https://fonts.googleapis.com/css";

const get = (url: string): Promise<string> =>
  new Promise((resolve, reject): void => {
    const request = new XMLHttpRequest();

    request.overrideMimeType("application/json");
    request.open("GET", url, true);

    request.onreadystatechange = () => {
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

const getFontStylesheet = async (
  fonts: Font[],
  subsets: Subset[],
  variants: Variant[]
): Promise<string> => {
  const url = new URL(GOOGLE_FONTS_CSS);

  const variantsStr = variants.join(",");
  const familiesStr = fonts.map((font): string => `${font.family}:${variantsStr}`);

  url.searchParams.append("family", familiesStr.join("|"));
  url.searchParams.append("subset", subsets.join(","));
  // Tell browser to render fallback font immediately and swap in the new font once it's loaded
  url.searchParams.append("font-display", "swap");

  return get(url.href);
};

const getFontId = (fontFamily: string) => fontFamily.replace(/\s+/g, "-").toLowerCase();

export const fetchFontList = async (apiKey: string): Promise<Font[]> => {
  // Request a list of all available Google Fonts, sorted by popularity
  const url = new URL(GOOGLE_FONTS_API);

  url.searchParams.append("sort", "popularity");
  url.searchParams.append("key", apiKey);

  const response = await get(url.href);
  const fonts: Font[] = JSON.parse(response).items;

  // Generate an ID for each font
  return fonts.map((font) => ({
    ...font,
    id: getFontId(font.family)
  }));
};

/**
 * Add a stylesheet for the given font to the document head
 */
export const loadFontStylesheet = async (
  font: Font,
  subsets: Subset[],
  variants: Variant[]
) => {
  // Load font stylesheet if it hasn't been loaded yet
  if (!hasStylesheet(font.id)) {
    const fontStyle = await getFontStylesheet([font], subsets, variants);
    createStylesheet(font.id, fontStyle);
  }
};
