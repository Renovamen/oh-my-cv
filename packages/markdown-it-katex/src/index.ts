// Adapted from https://github.com/waylonflinn/markdown-it-katex

import Katex, { type KatexOptions } from "katex";
import type { PluginWithOptions } from "markdown-it";
import type StateInline from "markdown-it/lib/rules_inline/state_inline";
import type { RuleBlock } from "markdown-it/lib/parser_block";
import type { RuleInline } from "markdown-it/lib/parser_inline";
import { htmlEscape } from "./utils";

const isValidDelim = (
  state: StateInline,
  pos: number
): { canOpen: boolean; canClose: boolean } => {
  const prevChar = pos > 0 ? state.src.charCodeAt(pos - 1) : -1;
  const nextChar = pos + 1 <= state.posMax ? state.src.charCodeAt(pos + 1) : -1;

  let canOpen = true;
  let canClost = true;

  /*
   * Check non-whitespace conditions for opening and closing, and
   * check that closing delimeter isn't followed by a number
   */
  if (
    prevChar === 0x20 /* " " */ ||
    prevChar === 0x09 /* \t */ ||
    (nextChar >= 0x30 /* "0" */ && nextChar <= 0x39) /* "9" */
  ) {
    canClost = false;
  }
  if (nextChar === 0x20 /* " " */ || nextChar === 0x09 /* \t */) {
    canOpen = false;
  }

  return {
    canOpen: canOpen,
    canClose: canClost
  };
};

const mathInline: RuleInline = (state, silent) => {
  let match, token, res, pos;

  if (state.src[state.pos] !== "$") return false;

  res = isValidDelim(state, state.pos);
  if (!res.canOpen) {
    if (!silent) state.pending += "$";

    state.pos += 1;
    return true;
  }

  /*
   * First check for and bypass all properly escaped delimieters
   * This loop will assume that the first leading backtick can not
   * be the first character in state.src, which is known since
   * we have found an opening delimieter already.
   */
  const start = state.pos + 1;

  match = start;
  while ((match = state.src.indexOf("$", match)) !== -1) {
    // Found potential $, look for escapes, pos will point to
    // first non escape when complete
    pos = match - 1;
    while (state.src[pos] === "\\") pos -= 1;

    // Even number of escapes, potential closing delimiter found
    if ((match - pos) % 2 === 1) break;

    match += 1;
  }

  // No closing delimter found.  Consume $ and continue.
  if (match === -1) {
    if (!silent) state.pending += "$";

    state.pos = start;
    return true;
  }

  // Check if we have empty content, ie: $$.  Do not parse.
  if (match - start === 0) {
    if (!silent) state.pending += "$$";

    state.pos = start + 1;
    return true;
  }

  // Check for valid closing delimiter
  res = isValidDelim(state, match);

  if (!res.canClose) {
    if (!silent) state.pending += "$";

    state.pos = start;
    return true;
  }

  if (!silent) {
    token = state.push("mathInline", "math", 0);
    token.markup = "$";
    token.content = state.src.slice(start, match);
  }

  state.pos = match + 1;

  return true;
};

const mathBlock: RuleBlock = (state, start, end, silent) => {
  let firstLine;
  let lastLine;
  let next;
  let lastPos;
  let found = false;
  let pos = state.bMarks[start] + state.tShift[start];
  let max = state.eMarks[start];

  if (pos + 2 > max) return false;
  if (state.src.slice(pos, pos + 2) !== "$$") return false;

  pos += 2;
  firstLine = state.src.slice(pos, max);

  if (silent) return true;

  if (firstLine.trim().endsWith("$$")) {
    // Single line expression
    firstLine = firstLine.trim().slice(0, -2);
    found = true;
  }

  for (next = start; !found; ) {
    next += 1;

    if (next >= end) break;

    pos = state.bMarks[next] + state.tShift[next];
    max = state.eMarks[next];

    if (pos < max && state.tShift[next] < state.blkIndent)
      // non-empty line with negative indent should stop the list:
      break;

    if (state.src.slice(pos, max).trim().endsWith("$$")) {
      lastPos = state.src.slice(0, max).lastIndexOf("$$");
      lastLine = state.src.slice(pos, lastPos);
      found = true;
    }
  }

  state.line = next + 1;

  const token = state.push("mathBlock", "math", 0);

  token.block = true;
  token.content =
    (firstLine?.trim() ? `${firstLine}\n` : "") +
    state.getLines(start + 1, next, state.tShift[start], true) +
    (lastLine?.trim() ? lastLine : "");
  token.map = [start, state.line];
  token.markup = "$$";

  return true;
};

export const MarkdownItKatex: PluginWithOptions<KatexOptions> = (
  md,
  options = { throwOnError: false }
) => {
  // set KaTeX as the renderer for markdown-it-simplemath
  const katexInline = (tex: string, options: KatexOptions): string => {
    options.displayMode = false;

    try {
      return Katex.renderToString(tex, options);
    } catch (error) {
      if (options.throwOnError) console.warn(error);

      return `<span title='${htmlEscape(
        (error as Error).toString()
      )}'>${htmlEscape(tex)}</span>`;
    }
  };

  const katexBlock = (tex: string, options: KatexOptions): string => {
    options.displayMode = true;

    try {
      return `<p>${Katex.renderToString(tex, options)}</p>\n`;
    } catch (error) {
      if (options.throwOnError) console.warn(error);

      return `<p class='katex-error' title='${htmlEscape(
        (error as Error).toString()
      )}'>${htmlEscape(tex)}</p>\n`;
    }
  };

  md.inline.ruler.after("escape", "mathInline", mathInline);
  // It’s a workaround here because types issue
  md.block.ruler.after("blockquote", "mathBlock", mathBlock, {
    alt: ["paragraph", "reference", "blockquote", "list"]
  });

  md.renderer.rules.mathInline = (tokens, idx): string =>
    katexInline(tokens[idx].content, options);
  md.renderer.rules.mathBlock = (tokens, idx): string =>
    katexBlock(tokens[idx].content, options);
};

export default MarkdownItKatex;
