import MarkdownIt from "markdown-it";
// @ts-expect-error missing types
import MarkdownItDeflist from "markdown-it-deflist";
import LinkAttributes from "markdown-it-link-attributes";
import MarkdownItKatex from "@renovamen/markdown-it-katex";
import MarkdownItCite from "@renovamen/markdown-it-cite";
import frontmatter from "@renovamen/front-matter";
import type { ResumeFrontMatter } from "~/types";

const markdown = (() => {
  const md = new MarkdownIt({ html: true });

  md.use(MarkdownItDeflist);
  md.use(MarkdownItKatex);
  md.use(MarkdownItCite);

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
    const newDl = dl.replace(/<\/dd>\n<dt>/g, "</dd>\n</dl>\n<dl>\n<dt>")
    html = html.replace(dl, newDl);
  }

  return html;
};

const resolveHeader = (html: string, frontmatter: ResumeFrontMatter) => {
  let header = "";

  if (frontmatter.name) header += `<h1>${frontmatter.name}</h1>\n`;

  if (frontmatter.header) {
    const n = frontmatter.header.length;

    for (let i = 0; i < n; i++) {
      const item = frontmatter.header[i];
      if (!item) continue;

      header += item.newLine ? "<br>\n" : "";

      header += `<span class="preview-header-item${
        i === n - 1 || frontmatter.header[i + 1].newLine ? " no-separator" : ""
      }">`;

      if (item.link)
        header += `<a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.text}</a>`;
      else header += item.text;

      header += `</span>\n`;
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
