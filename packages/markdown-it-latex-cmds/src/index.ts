import type { PluginSimple, Renderer, ParserBlock, StateBlock } from "markdown-it";

// same as UNESCAPE_MD_RE plus a space
const UNESCAPE_RE = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;

const renderNewPage: Renderer.RenderRule = () => `<div class="md-it-newpage"></div>`;

const renderLineBreak: Renderer.RenderRule = (tokens, idx) =>
  `<div class="md-it-line-break" style="margin-top:${tokens[idx].meta.h};"></div>`;

const checkPattern = (
  state: StateBlock,
  start: number,
  pattern: string,
  options: {
    minLength?: number;
    silent?: boolean;
  } = {}
) => {
  const { minLength = pattern.length, silent = false } = options;

  const pos = state.bMarks[start] + state.tShift[start];
  const max = state.eMarks[start];

  // Don't run any pairs in validation mode
  if (silent) return false;

  // Should contain at least minLength characters
  if (pos + minLength > max) return false;
  // Should be the same as pattern
  if (state.src.slice(pos, pos + pattern.length) !== pattern) return false;

  return {
    pos,
    max
  };
};

const newPage: ParserBlock.RuleBlock = (state, start, end, silent) => {
  if (!checkPattern(state, start, "\\newpage", { silent })) return false;

  // Skip "\newpage"
  state.line = start + 1;

  // Add newpage div token
  const token = state.push("renderNewPage", "", 0);
  token.block = true;
  token.map = [start, state.line];
  token.markup = "\\newpage";

  return true;
};

const lineBreak: ParserBlock.RuleBlock = (state, start, end, silent) => {
  // Try to find "\\["
  const res = checkPattern(state, start, "\\\\[", {
    minLength: 5, // Should be at least "\\[x]"
    silent
  });
  if (!res) return false;

  const { pos, max } = res;

  // Try to find "]"
  let lastPos = pos + 4;
  while (lastPos < max && state.src[lastPos] !== "]") lastPos++;

  // Did't find "]"
  if (lastPos >= max) return false;

  // Parse line break height, e.g. "\\[10px]"
  const height = state.src.slice(pos + 3, lastPos);
  // Don't allow unescaped spaces/newlines inside
  if (height.match(/(^|[^\\])(\\\\)*\s/)) return false;

  // Skip "\\[x]"
  state.line = start + 1;

  // Add line break div token
  const token = state.push("renderLineBreak", "", 0);
  token.meta = { h: height.replace(UNESCAPE_RE, "$1") };
  token.block = true;
  token.map = [start, state.line];
  token.markup = "\\[]";

  return true;
};

/**
 * A plugin for markdown-it that adds LaTeX commands. This plugin adds the following commands:
 * - `\newpage`: Adds a new page.
 * - `\\[10px]`: Adds a line break with a height of 10px.
 */
export const MarkdownItLatexCmds: PluginSimple = (md) => {
  md.renderer.rules.renderNewPage = renderNewPage;
  md.renderer.rules.renderLineBreak = renderLineBreak;

  md.block.ruler.after("blockquote", "newPage", newPage);
  md.block.ruler.after("newPage", "lineBreak", lineBreak);
};

export default MarkdownItLatexCmds;
