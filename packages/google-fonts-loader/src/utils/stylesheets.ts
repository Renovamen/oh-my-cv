const _stylesheetId = (fontId: string) => `font-${fontId}`;

export const hasStylesheet = (fontId: string) =>
  document.getElementById(_stylesheetId(fontId)) !== null;

export const createStylesheet = (fontId: string, styles: string) => {
  const stylesheet = document.createElement("style");

  stylesheet.id = _stylesheetId(fontId);
  stylesheet.textContent = styles;

  document.head.appendChild(stylesheet);
};
