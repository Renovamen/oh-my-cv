export const getStylesheetId = (fontId: string) => `font-${fontId}`;

export const hasStylesheet = (fontId: string) =>
  document.getElementById(getStylesheetId(fontId)) !== null;

export const createStylesheet = (fontId: string, styles: string) => {
  const stylesheet = document.createElement("style");

  stylesheet.id = getStylesheetId(fontId);
  stylesheet.textContent = styles;

  document.head.appendChild(stylesheet);
};
