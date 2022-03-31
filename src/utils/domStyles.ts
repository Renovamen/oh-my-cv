import type { ResumeStyles } from "../types";

export const updatePageMargin = (page: HTMLDivElement, state: ResumeStyles) => {
  page.style.paddingTop = `${state.marginV}px`;
  page.style.paddingBottom = `${state.marginV}px`;
  page.style.paddingLeft = `${state.marginH}px`;
  page.style.paddingRight = `${state.marginH}px`;
};
