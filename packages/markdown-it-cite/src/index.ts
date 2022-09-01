// Adapted from https://github.com/markdown-it/markdown-it-footnote

import type MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token";
import type { RenderRule } from "markdown-it/lib/renderer";
import type { RuleBlock } from "markdown-it/lib/parser_block";
import type { RuleInline } from "markdown-it/lib/parser_inline";
import type { RuleCore } from "markdown-it/lib/parser_core";

const getAnchorName = (tokens: Token[], idx: number) =>
  Number(tokens[idx].meta.id + 1).toString();

const getAnchorCaption = (tokens: Token[], idx: number) =>
  tokens[idx].meta.label;

const renderReference: RenderRule = (tokens, idx) => {
  const id = getAnchorName(tokens, idx);
  const caption = getAnchorCaption(tokens, idx);
  return `<sup class="cite-ref"><a href="#cite${id}" id="cite-ref${id}">${caption}</a></sup>`;
};

const renderOpenTag: RenderRule = (tokens, idx) => {
  const id = getAnchorName(tokens, idx);
  const caption = getAnchorCaption(tokens, idx);
  return `<ul class="cite-list"><li id="cite${id}" class="cite-item" data-caption="${caption}">`;
};

const renderCloseTag: RenderRule = () => "</li>\n</ul>\n";

export const MarkdownItCite = (md: MarkdownIt) => {
  md.renderer.rules.renderReference = renderReference;
  md.renderer.rules.renderOpenTag = renderOpenTag;
  md.renderer.rules.renderCloseTag = renderCloseTag;

  // Process cite block definition
  const citeDefinition: RuleBlock = (state, startLine, endLine, silent) => {
    const start = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];

    // line should be at least 5 chars - "[^x]:"
    if (start + 4 > max) return false;

    if (state.src.charCodeAt(start) !== 0x5b /* [ */) return false;
    if (state.src.charCodeAt(start + 1) !== 0x5e /* ^ */) return false;

    let pos, offset;

    for (pos = start + 2; pos < max; pos++) {
      if (state.src.charCodeAt(pos) === 0x20) return false;
      if (state.src.charCodeAt(pos) === 0x5d /* ] */) break;
    }

    if (pos === start + 2) return false; // no empty cite labels
    if (pos + 1 >= max || state.src.charCodeAt(++pos) !== 0x3a /* : */)
      return false;
    if (silent) return true;

    pos++;

    if (!state.env.cites) state.env.cites = {};
    if (!state.env.cites.refs) state.env.cites.refs = {};

    const label = state.src.slice(start + 2, pos - 2);
    state.env.cites.refs[":" + label] = -1;

    const openToken = new state.Token("cite_reference_open", "", 1);
    openToken.meta = { label: label };
    openToken.level = state.level++;
    state.tokens.push(openToken);

    const oldBMark = state.bMarks[startLine];
    const oldTShift = state.tShift[startLine];
    const oldSCount = state.sCount[startLine];

    const posAfterColon = pos;
    const initial = (offset =
      state.sCount[startLine] +
      pos -
      (state.bMarks[startLine] + state.tShift[startLine]));

    let ch;
    while (pos < max) {
      ch = state.src.charCodeAt(pos);

      if (md.utils.isSpace(ch)) {
        if (ch === 0x09) offset += 4 - (offset % 4);
        else offset++;
      } else break;

      pos++;
    }

    state.tShift[startLine] = pos - posAfterColon;
    state.sCount[startLine] = offset - initial;

    state.bMarks[startLine] = posAfterColon;
    state.blkIndent += 4;

    if (state.sCount[startLine] < state.blkIndent) {
      state.sCount[startLine] += state.blkIndent;
    }

    state.md.block.tokenize(state, startLine, endLine);

    state.blkIndent -= 4;
    state.tShift[startLine] = oldTShift;
    state.sCount[startLine] = oldSCount;
    state.bMarks[startLine] = oldBMark;

    const closeToken = new state.Token("cite_reference_close", "", -1);
    closeToken.level = --state.level;
    state.tokens.push(closeToken);

    return true;
  };

  // Process cite references ([^...])
  const citeReference: RuleInline = (state, silent) => {
    const max = state.posMax;
    const start = state.pos;

    // should be at least 4 chars - "[^x]"
    if (start + 3 > max) return false;

    if (!state.env.cites || !state.env.cites.refs) return false;
    if (state.src.charCodeAt(start) !== 0x5b /* [ */) return false;
    if (state.src.charCodeAt(start + 1) !== 0x5e /* ^ */) return false;

    let pos;

    for (pos = start + 2; pos < max; pos++) {
      if (state.src.charCodeAt(pos) === 0x20) return false;
      if (state.src.charCodeAt(pos) === 0x0a) return false;
      if (state.src.charCodeAt(pos) === 0x5d /* ] */) break;
    }

    if (pos === start + 2) return false; // no empty cite labels
    if (pos >= max) return false;

    pos++;

    const label = state.src.slice(start + 2, pos - 1);

    if (typeof state.env.cites.refs[":" + label] === "undefined") {
      return false;
    }

    if (!silent) {
      if (!state.env.cites.list) state.env.cites.list = [];

      let citeId;

      if (state.env.cites.refs[":" + label] < 0) {
        citeId = state.env.cites.list.length;
        state.env.cites.list[citeId] = label;
        state.env.cites.refs[":" + label] = citeId;
      } else {
        citeId = state.env.cites.refs[":" + label];
      }

      const token = state.push("renderReference", "", 0);
      token.meta = { id: citeId, label: label };
    }

    state.pos = pos;
    state.posMax = max;

    return true;
  };

  // Replace cite tokens
  const citeCore: RuleCore = (state) => {
    const list = state.env.cites?.list as string[] | undefined;

    for (let i = 0; i < state.tokens.length; i++) {
      if (state.tokens[i].type === "cite_reference_open") {
        const currentLabel = state.tokens[i].meta.label;
        const id = list
          ? list.findIndex((item: string) => item === currentLabel)
          : -1;

        const openToken = new state.Token("renderOpenTag", "", 1);
        openToken.meta = { id: id, label: currentLabel };

        state.tokens[i] = openToken;
      } else if (state.tokens[i].type === "cite_reference_close") {
        const closeToken = new state.Token("renderCloseTag", "", -1);
        state.tokens[i] = closeToken;
      }
    }
  };

  md.block.ruler.before("reference", "citeDefinition", citeDefinition, {
    alt: ["paragraph", "reference"]
  });
  md.inline.ruler.after("image", "citeReference", citeReference);
  md.core.ruler.after("inline", "citeCore", citeCore);
};

export default MarkdownItCite;
