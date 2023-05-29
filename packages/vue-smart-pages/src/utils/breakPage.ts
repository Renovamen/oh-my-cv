const NEW_PAGE = "md-it-newpage";

const removeElements = (parent: HTMLElement, selector: string) => {
  const elements = Array.from(parent.querySelectorAll(selector));

  for (const e of elements) parent.removeChild(e);
};

export const breakPage = (
  id: string,
  height: number,
  top: number,
  bottom: number,
  left: number,
  right: number
) => {
  const page = document.querySelector(`#${id}`) as HTMLDivElement;
  if (!page) return;
  removeElements(page, ".vue-smart-page-break");

  const contentH = height - top - bottom;

  const getPageBreakElement = (marginTop: number) => {
    const pageBreak = document.createElement("div") as HTMLDivElement;
    pageBreak.className = "vue-smart-page-break";

    pageBreak.style.marginTop = `${marginTop}px`;
    pageBreak.style.paddingBottom = `${bottom}px`;

    pageBreak.style.marginLeft = `-${left}px`;
    pageBreak.style.marginRight = `-${right}px`;

    return pageBreak;
  };

  let pageH = 0;

  const newPage = document.createElement("div") as HTMLDivElement;

  for (const child of Array.from(page.children)) {
    const style = window.getComputedStyle(child, null);
    const childH =
      child.clientHeight +
      parseInt(style.marginTop) +
      parseInt(style.marginBottom);

    if (pageH + childH > contentH || child.className === NEW_PAGE) {
      newPage.appendChild(getPageBreakElement(height - pageH - top));
      pageH = 0;
    }

    newPage.appendChild(child.cloneNode(true));
    pageH += childH;
  }

  page.innerHTML = newPage.innerHTML;
  page.style.paddingBottom = `${height - pageH - top}px`;
};
