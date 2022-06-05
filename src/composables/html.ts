import MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token";
import MarkdownItDeflist from "markdown-it-deflist";
import { MarkdownItKatex, extractFrontMatter, resolvePageBreak } from "~/utils";
import type { ResumeFrontMatter } from "~/types";

const markdown = (() => {
  const md = new MarkdownIt({ html: true })
    .use(MarkdownItDeflist)
    .use(MarkdownItKatex);

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
      (tokens[idx] as Token).attrs![aIndex][1] = "_blank"; // replace value of existing attr
    }
    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
  };

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
    const { body, attributes } = extractFrontMatter(data.mdContent);

    let html = markdown.render(body);
    html = resolveDeflist(html);
    html = resolveHeader(html, attributes);

    return html;
  });

  const { onFontLoaded } = useStyleStore();

  // Resolve page break after HTML changing
  onMounted(() => {
    watch(
      () => html.value,
      () =>
        nextTick(() =>
          onFontLoaded().then(() => setTimeout(() => resolvePageBreak(), 50))
        )
    );
  });

  return html;
};
