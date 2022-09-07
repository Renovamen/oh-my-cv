import type MarkdownIt from "markdown-it";
import type { RenderRule } from "markdown-it/lib/renderer";
import type { RuleInline } from "markdown-it/lib/parser_inline";

// same as UNESCAPE_MD_RE plus a space
const UNESCAPE_RE = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;

const renderLineBreak: RenderRule = (tokens, idx) => {
  return `<div style="margin-top:${tokens[idx].meta.h};"></div>`;
};

const lineBreak: RuleInline = (state, silent) => {
  const max = state.posMax;
  const start = state.pos;

  if (silent) return false; // don't run any pairs in validation mode
  if (start - 2 + 4 > max) return false; // should be at least 5 chars - "\\[x]"
  if (
    state.src.charCodeAt(start - 2) !== 0x5c /* \ */ ||
    state.src.charCodeAt(start - 1) !== 0x5c /* \ */ ||
    state.src.charCodeAt(start) !== 0x5b /* [ */
  )
    return false;

  state.pos = start + 1;

  let found;
  while (state.pos < max) {
    if (state.src.charCodeAt(state.pos) === 0x5d /* ] */) {
      found = true;
      break;
    }

    state.md.inline.skipToken(state);
  }

  if (!found || start + 1 === state.pos) {
    state.pos = start;
    return false;
  }

  const content = state.src.slice(start + 1, state.pos);

  // don't allow unescaped spaces/newlines inside
  if (content.match(/(^|[^\\])(\\\\)*\s/)) {
    state.pos = start;
    return false;
  }

  // found!
  state.tokens[state.tokens.length - 1].content = ""; // remove "\\"

  const token = state.push("renderLineBreak", "", 0);
  token.meta = { h: content.replace(UNESCAPE_RE, "$1") };

  state.pos = state.posMax + 1;
  state.posMax = max;

  return true;
};

export const MarkdownItLineBreak = (md: MarkdownIt) => {
  md.renderer.rules.renderLineBreak = renderLineBreak;
  md.inline.ruler.after("emphasis", "lineBreak", lineBreak);
};

export default MarkdownItLineBreak;
