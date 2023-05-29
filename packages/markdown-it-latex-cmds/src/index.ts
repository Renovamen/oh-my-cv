import type { PluginSimple } from "markdown-it";
import type { RenderRule } from "markdown-it/lib/renderer";
import type { RuleBlock } from "markdown-it/lib/parser_block";

// same as UNESCAPE_MD_RE plus a space
const UNESCAPE_RE = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;

const renderNewPage: RenderRule = () => `<div class="md-it-newpage"></div>`;
const renderLineBreak: RenderRule = (tokens, idx) =>
  `<div class="md-it-line-break" style="margin-top:${tokens[idx].meta.h};"></div>`;

const newPage: RuleBlock = (state, start, end, silent) => {
  const pos = state.bMarks[start] + state.tShift[start];
  const max = state.eMarks[start];

  if (silent) return false; // don't run any pairs in validation mode
  if (pos + 8 > max || state.src.slice(pos, pos + 8) !== "\\newpage")
    return false; // should be "\newpage"

  // skip "\newpage"
  state.line = start + 1;

  // add newpage token
  const token = state.push("renderNewPage", "", 0);
  token.block = true;
  token.map = [start, state.line];
  token.markup = "\newpage";

  return true;
};

const lineBreak: RuleBlock = (state, start, end, silent) => {
  const pos = state.bMarks[start] + state.tShift[start];
  const max = state.eMarks[start];

  if (silent) return false; // don't run any pairs in validation mode

  if (pos + 5 > max) return false; // should be at least 5 chars - "\\[x]"
  if (state.src.slice(pos, pos + 3) !== "\\\\[") return false; // should be "\\["

  // try to find "]"
  let lastPos = pos + 4;

  while (lastPos < max) {
    if (state.src[lastPos] === "]") break;
    lastPos++;
  }

  // did't find "]"
  if (lastPos >= max) return false;

  // parse line break height
  const height = state.src.slice(pos + 3, lastPos);
  // don't allow unescaped spaces/newlines inside
  if (height.match(/(^|[^\\])(\\\\)*\s/)) return false;

  // skip "\\[x]"
  state.line = start + 1;

  // add line break div token
  const token = state.push("renderLineBreak", "", 0);
  token.meta = { h: height.replace(UNESCAPE_RE, "$1") };
  token.block = true;
  token.map = [start, state.line];
  token.markup = "\\[]";

  return true;
};

export const MarkdownItLatexCmds: PluginSimple = (md) => {
  md.renderer.rules.renderNewPage = renderNewPage;
  md.renderer.rules.renderLineBreak = renderLineBreak;

  md.block.ruler.after("blockquote", "newPage", newPage);
  md.block.ruler.after("newPage", "lineBreak", lineBreak);
};

export default MarkdownItLatexCmds;
