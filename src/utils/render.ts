import { updatePreviewScale } from ".";
import { CHROME_PRINT_BOTTOM, getPaperPx } from "./constants";

const removeElements = (parent: HTMLElement, selector: string) => {
  const elements = Array.from(parent.querySelectorAll(selector));

  for (const e of elements) parent.removeChild(e);
};

export const resolvePageBreak = () => {
  const { styles } = useStyleStore();

  const page = document.querySelector(".preview-page") as HTMLDivElement;
  removeElements(page, ".preview-page-break");

  const HEIGHT = getPaperPx(styles.paper, "h");
  const margin =
    styles.marginV + Math.max(styles.marginV - 10, CHROME_PRINT_BOTTOM);
  const contentH = HEIGHT - margin;

  const getPageBreakElement = (top: number) => {
    const pageBreak = document.createElement("div") as HTMLDivElement;
    pageBreak.className = "preview-page-break";

    pageBreak.style.marginTop = `${top}px`;
    pageBreak.style.paddingBottom = `${styles.marginV}px`;

    pageBreak.style.marginLeft = `-${styles.marginH}px`;
    pageBreak.style.marginRight = `-${styles.marginH}px`;

    return pageBreak;
  };

  let pageH = 0;

  const newPage = document.createElement("div") as HTMLDivElement;
  newPage.className = "preview-page";

  for (const child of Array.from(page.children)) {
    const style = window.getComputedStyle(child, null);
    const childH =
      child.clientHeight +
      parseInt(style.marginTop) +
      parseInt(style.marginBottom);

    if (pageH + childH > contentH) {
      newPage.appendChild(getPageBreakElement(HEIGHT - pageH - styles.marginV));
      pageH = 0;
    }

    newPage.appendChild(child.cloneNode(true));
    pageH += childH;
  }

  page.innerHTML = newPage.innerHTML;
  page.style.paddingBottom = `${HEIGHT - pageH - styles.marginV}px`;

  updatePreviewScale(); // Updata preview pane's scale
};
