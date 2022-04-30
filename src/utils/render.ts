import MarkdownIt from "markdown-it";
import MarkdownItDeflist from "markdown-it-deflist";
import { extractFrontMatter, updateStyles, updatePreviewScale } from ".";
import { CHROME_PRINT_BOTTOM, A4_HEIGHT } from "./constants";
import type { ResumeStyles, ResumeFrontMatter } from "../types";

const getMarkdownIt = () => {
  const md = new MarkdownIt({ html: true }).use(MarkdownItDeflist);

  // remember old renderer, if overridden, or proxy to default renderer
  const defaultRender =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    // if you are sure other plugins can't add `target` - drop check below
    const aIndex = tokens[idx].attrIndex("target");
    if (aIndex < 0) {
      tokens[idx].attrPush(["target", "_blank"]); // add new attribute
    } else {
      (tokens[idx] as any).attrs[aIndex][1] = "_blank"; // replace value of existing attr
    }
    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
  };

  return md;
};

const handleDeflist = (html: string) => {
  const dlReg = /<dl>([\s\S]*?)<\/dl>/g;
  const dlList = html.match(dlReg);

  if (dlList === null) return html;

  for (const dl of dlList) {
    const dtReg = /<dt>([\s\S]*?)<\/dt>/g;
    const dtList = dl.match(dtReg);

    if (!dtList || dtList?.length === 1) continue;

    const newDl = dl.replace(/<\/dd>/g, "</dd>\n</dl>\n<dl>");
    html = html.replace(dl, newDl);
  }

  return html;
};

const handleHeader = (html: string, frontmatter: ResumeFrontMatter) => {
  let header = "";

  if (frontmatter.name) header += `<h1>${frontmatter.name}</h1>\n`;

  if (frontmatter.header) {
    for (let i = 0; i < frontmatter.header.length; i++) {
      const item = frontmatter.header[i];
      if (!item) continue;
      header += item.newLine ? "<br>" : "";
      if (item.link)
        header += `<a class="preview-header-link" href="${
          item.link
        }" target="_blank" rel="noopener noreferrer">${
          i === 0 || item.newLine ? "" : "<span> | </span>"
        }<span>${item.text}</span></a>\n`;
      else
        header += `<span>${
          i === 0 || item.newLine ? "" : "<span> | </span>"
        }<span>${item.text}</span></span>\n`;
    }
  }

  return `<div class="preview-header">${header}</div>` + html;
};

const removeElements = (parent: HTMLElement, selector: string) => {
  const elements = parent.querySelectorAll(selector) as NodeListOf<HTMLElement>;

  for (const e of elements) parent.removeChild(e);
};

export const handlePageBreak = (state: ResumeStyles) => {
  const page = document.querySelector(".preview-page") as HTMLDivElement;
  removeElements(page, ".preview-page-break");

  const margin =
    state.marginV + Math.max(state.marginV - 10, CHROME_PRINT_BOTTOM);
  const contentH = A4_HEIGHT - margin;

  const getPageBreakElement = (top: number) => {
    const pageBreak = document.createElement("div") as HTMLDivElement;
    pageBreak.className = "preview-page-break";

    pageBreak.style.marginTop = `${top}px`;
    pageBreak.style.paddingBottom = `${state.marginV}px`;

    pageBreak.style.marginLeft = `-${state.marginH}px`;
    pageBreak.style.marginRight = `-${state.marginH}px`;

    return pageBreak;
  };

  let pageH = 0;

  const newPage = document.createElement("div") as HTMLDivElement;
  newPage.className = "preview-page";

  for (const child of page.children) {
    const style = window.getComputedStyle(child, null);
    const childH =
      child.clientHeight +
      parseInt(style.marginTop) +
      parseInt(style.marginBottom);

    if (pageH + childH > contentH) {
      newPage.appendChild(
        getPageBreakElement(A4_HEIGHT - pageH - state.marginV)
      );
      pageH = 0;
    }

    newPage.appendChild(child.cloneNode(true));
    pageH += childH;
  }

  page.innerHTML = newPage.innerHTML;
  page.style.paddingBottom = `${A4_HEIGHT - pageH - state.marginV}px`;

  updatePreviewScale(); // Updata preview pane's scale
};

const md = getMarkdownIt();

export const renderPreviewHTML = (text: string) => {
  const { body, attributes } = extractFrontMatter(text);

  let html = md.render(body);
  html = handleDeflist(html);
  html = handleHeader(html, attributes);

  return html;
};

export const onStylesUpdate = (state: ResumeStyles, pagePreak = true) => {
  updateStyles(state);
  pagePreak && handlePageBreak(state);
};
