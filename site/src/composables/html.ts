import MarkdownIt from "markdown-it";
// @ts-expect-error missing types
import MarkdownItDeflist from "markdown-it-deflist";
import LinkAttributes from "markdown-it-link-attributes";
import MarkdownItKatex from "@renovamen/markdown-it-katex";
import frontmatter from "@renovamen/front-matter";
import type { ResumeFrontMatter } from "~/types";

const markdown = (() => {
  const md = new MarkdownIt({ html: true });

  md.use(MarkdownItDeflist);
  md.use(MarkdownItKatex);

  md.use(LinkAttributes, {
    matcher: (link: string) => /^https?:\/\//.test(link),
    attrs: {
      target: "_blank",
      rel: "noopener"
    }
  });

  return md;
})();

const resolveDeflist = (html: string) => {
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

const resolveHeader = (html: string, frontmatter: ResumeFrontMatter) => {
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

export const usePreviewHTML = () => {
  const { data } = useDataStore();

  const html = computed(() => {
    const { body, attributes } = frontmatter(data.mdContent);

    let html = markdown.render(body);
    html = resolveDeflist(html);
    html = resolveHeader(html, attributes);

    return html;
  });

  return html;
};
