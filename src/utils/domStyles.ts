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
  if (["H1", "H2", "H3", "H4", "A"].indexOf(node.tagName) === -1) return;
  if (node.tagName === "A" && node.classList.contains("preview-header-link"))
    return; // links in header are black
  node.style.color = state.themeColor;
  if (node.tagName === "H2") node.style.borderBottomColor = state.themeColor;
};

export const updateDomStyles = (
  container: HTMLDivElement,
  state: ResumeStyles
) => {
  // Page margin
  const pages = container.querySelectorAll(
    ".preview-page"
  ) as NodeListOf<HTMLDivElement>;
  for (const page of pages) updatePageMargin(page, state);

  // Other styles
  const childNodes = container.querySelectorAll("*") as NodeListOf<HTMLElement>;
  for (const node of childNodes) {
    updateThemeColor(node, state);
  }
};
