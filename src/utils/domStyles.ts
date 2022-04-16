import { CHROME_PRINT_BOTTOM } from "./constants";
import type { ResumeStyles } from "../types";

const updatePageMargin = (page: HTMLDivElement, state: ResumeStyles) => {
  page.style.paddingTop = `${state.marginV}px`;
  page.style.paddingBottom = `${Math.max(
    state.marginV - 10,
    CHROME_PRINT_BOTTOM
  )}px`;
  page.style.paddingLeft = `${state.marginH}px`;
  page.style.paddingRight = `${state.marginH}px`;
};

const updateThemeColor = (node: HTMLElement, state: ResumeStyles) => {
  if (["H1", "H2", "H3", "A"].indexOf(node.tagName) === -1) return;
  if (node.tagName === "A" && node.classList.contains("preview-header-link"))
    return; // links in header are black
  node.style.color = state.themeColor;
  if (node.tagName === "H2") node.style.borderBottomColor = state.themeColor;
};

const updateLineHeight = (node: HTMLElement, state: ResumeStyles) => {
  const lineHeight = state.lineHeight / 100;
  if (["P", "LI"].indexOf(node.tagName) !== -1)
    node.style.lineHeight = lineHeight.toFixed(2);
  if (["H2", "H3"].indexOf(node.tagName) !== -1) {
    node.style.lineHeight = (lineHeight * 1.154).toFixed(2);
    node.style.marginTop = `${((0.3125 * lineHeight) / 1.3).toFixed(3)}rem`;
  }
  if (node.tagName === "DL")
    node.style.lineHeight = (lineHeight * 1.038).toFixed(2);
};

const updateFontFamily = (container: HTMLElement, state: ResumeStyles) => {
  const fontEN = state.fontEN.fontFamily || state.fontEN.name;
  const fontCN = state.fontCN.fontFamily || state.fontCN.name;
  container.style.fontFamily = fontEN + ", " + fontCN;
};

export const updateDomStyles = (
  container: HTMLDivElement,
  state: ResumeStyles
) => {
  // Font familt
  updateFontFamily(container, state);

  // Page margin
  const pages = container.querySelectorAll(
    ".preview-page"
  ) as NodeListOf<HTMLDivElement>;
  for (const page of pages) updatePageMargin(page, state);

  // Other styles
  const childNodes = container.querySelectorAll("*") as NodeListOf<HTMLElement>;
  for (const node of childNodes) {
    updateThemeColor(node, state);
    updateLineHeight(node, state);
  }
};
