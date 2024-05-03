import MarkdownIt from "markdown-it";
// @ts-expect-error missing types
import MarkdownItDeflist from "markdown-it-deflist";
import LinkAttributes from "markdown-it-link-attributes";
import MarkdownItKatex from "@renovamen/markdown-it-katex";
import MarkdownItCite from "markdown-it-cross-ref";
import MarkdownItLatexCmds from "markdown-it-latex-cmds";
import frontmatter from "@renovamen/front-matter";
import type { ResumeFrontMatter } from "~/types";

const markdown = (() => {
  const md = new MarkdownIt({ html: true });

  md.use(MarkdownItDeflist);
  md.use(MarkdownItKatex);
  md.use(MarkdownItCite);
  md.use(MarkdownItLatexCmds);

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
    const newDl = dl.replace(/<\/dd>\n<dt>/g, "</dd>\n</dl>\n<dl>\n<dt>");
    html = html.replace(dl, newDl);
  }

  return html;
};

const isValidImageSrc = (string: string) => {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};

const resolveHeader = (html: string, frontmatter: ResumeFrontMatter) => {
  let header = "";
  if (frontmatter.image && isValidImageSrc(frontmatter.image)) {
    header += `<img class="header-image" src="${frontmatter.image}">\n`;
  }

  header += `<div class="header-text">\n`;
  if (frontmatter.name) header += `<h1>${frontmatter.name}</h1>\n`;

  if (frontmatter.header) {
    const n = frontmatter.header.length;

    for (let i = 0; i < n; i++) {
      const item = frontmatter.header[i];
      if (!item) continue;

      header += item.newLine ? "<br>\n" : "";

      header += `<span class="header-text-item${
        i === n - 1 || frontmatter.header[i + 1].newLine ? " no-separator" : ""
      }">`;

      if (item.link)
        header += `<a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.text}</a>`;
      else header += item.text;

      header += `</span>\n`;
    }
    header += `</div>\n`; // close header-wrapper
  }

  return `<div class="resume-header">${header}</div>` + html;
};

export const renderMarkdown = (md: string) => {
  const { body, attributes } = frontmatter(md);

  let html = markdown.render(body);
  html = resolveDeflist(html);
  html = resolveHeader(html, attributes);

  return html;
};
