import { nextTick } from "vue";
import MarkdownIt from "markdown-it";
import MarkdownItDeflist from "markdown-it-deflist";
import matter from "front-matter";
import type { ResumeStyles, ResumeFrontMatter } from "../types";
import { updatePageMargin } from "./domStyles";

export const getMarkdownIt = () => {
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

export const handleDeflist = (html: string) => {
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

export const handleHeader = (html: string, frontmatter: ResumeFrontMatter) => {
  let header = "";

  if (frontmatter.name) header += `<h1>${frontmatter.name}</h1>\n`;

  if (frontmatter.header) {
    for (let i = 0; i < frontmatter.header.length; i++) {
      const item = frontmatter.header[i];
      if (!item) continue;
      header += item.newLine ? "<br>" : "";
      if (item.link)
        header += `<a href="${
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

export const handlePageBreak = (state: ResumeStyles) => {
  const container = document.querySelector(".preview") as HTMLDivElement;

  const margin = state.marginV * 2;
  const a4Height = 1120;

  const getPageElement = () => {
    const page = document.createElement("div") as HTMLDivElement;
    page.className = "preview-page";
    updatePageMargin(page, state);
    return page;
  };

  const getPageBreakElement = () => {
    const pageBreak = document.createElement("div") as HTMLDivElement;
    pageBreak.className = "preview-page-break";
    return pageBreak;
  };

  let page = getPageElement();
  let pageH = 0;

  const newContainer = document.createElement("div") as HTMLDivElement;
  newContainer.className = "preview";

  const childList = [];

  if (container.children[0].className !== "preview-page") {
    for (const child of container.children) childList.push(child);
  } else {
    for (const page of container.children) {
      for (const child of page.children) {
        childList.push(child);
      }
    }
  }

  for (const child of childList) {
    const style = window.getComputedStyle(child, null);
    const childH =
      child.clientHeight +
      parseInt(style.marginTop) +
      parseInt(style.marginBottom);

    if (pageH + childH > a4Height - margin) {
      newContainer.appendChild(page);
      newContainer.appendChild(getPageBreakElement());
      page = getPageElement();
      pageH = 0;
    }

    page.appendChild(child.cloneNode(true));
    pageH += childH;
  }
  newContainer.appendChild(page);

  container.innerHTML = newContainer.innerHTML;
};

const md = getMarkdownIt();

export const renderPreviewHTML = (text: string) => {
  const { body, attributes } = matter(text);

  let html = md.render(body);
  html = handleDeflist(html);
  html = handleHeader(html, attributes);

  return html;
};

export const updateStyles = (state: ResumeStyles) => {
  const pages = document.querySelectorAll(
    ".preview-page"
  ) as NodeListOf<HTMLDivElement>;
  for (const page of pages) updatePageMargin(page, state);
};

export const onStylesUpdate = (state: ResumeStyles) => {
  updateStyles(state); // update styles so that handlePageBreak() can get accurate element heights
  handlePageBreak(state);
  nextTick(() => {
    updateStyles(state); // after handlePageBreak(), all elements' styles will be cleared, so updateStyles() again
  });
};
