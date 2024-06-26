// Based on https://github.com/markdown-it/markdown-it-footnote

import type {
  Token,
  PluginSimple,
  ParserBlock,
  ParserInline,
  Core,
  Renderer,
  StateBlock,
  StateInline
} from "markdown-it";

const _anchorId = (tokens: Token[], idx: number) =>
  Number(tokens[idx].meta.id + 1).toString();

const _anchorLabel = (tokens: Token[], idx: number) => tokens[idx].meta.label;

const _isOpen = (state: StateBlock | StateInline, start: number) => {
  return (
    state.src.charCodeAt(start) === 0x5b /* [ */ &&
    state.src.charCodeAt(start + 1) === 0x7e /* ~ */
  );
};

const _isClose = (state: StateBlock | StateInline, pos: number) => {
  return state.src.charCodeAt(pos) === 0x5d /* ] */;
};

const _extractLabel = (state: StateBlock | StateInline, start: number, end: number) => {
  return state.src.slice(start, end);
};

const render =
  (type: "defOpen" | "ref"): Renderer.RenderRule =>
  (tokens, idx) => {
    const id = `cross-ref-${_anchorId(tokens, idx)}`;
    const label = _anchorLabel(tokens, idx);

    return type === "ref"
      ? `<sup data-scope="cross-ref" data-part="reference"><a data-scope="cross-ref" data-part="link" href="#${id}" id="${id}">${label}</a></sup>`
      : `<ul data-scope="cross-ref" data-part="definitions"><li id="${id}" data-scope="cross-ref" data-part="definition" data-label="${label}">`;
  };

const _processDefToken = (
  state: StateBlock,
  startLine: number,
  endLine: number,
  pos: number,
  label: string
) => {
  state.env.crossRef ??= {};
  state.env.crossRef.labelToId ??= {};
  state.env.crossRef.labelToId[label] = -1;

  // Create and push the opening token
  const openToken = new state.Token("renderDefOpen", "", 1);
  openToken.meta = { label };
  openToken.level = state.level++;
  state.tokens.push(openToken);

  // Save the current state
  const bMarks = state.bMarks[startLine];
  const tShift = state.tShift[startLine];
  const sCount = state.sCount[startLine];

  // Calculate the initial offset
  const posAfterColon = pos;
  const initial = sCount + pos - (bMarks + tShift);
  let offset = initial;

  // Adjust position and offset for spaces
  while (pos < state.eMarks[startLine]) {
    const ch = state.src.charCodeAt(pos);

    if (state.md.utils.isSpace(ch)) {
      offset += ch === 0x09 ? 4 - (offset % 4) : 1;
    } else {
      break;
    }

    pos++;
  }

  // Update state shifts and block indent
  state.tShift[startLine] = pos - posAfterColon;
  state.sCount[startLine] = offset - initial;
  state.bMarks[startLine] = posAfterColon;
  state.blkIndent += 4;

  if (state.sCount[startLine] < state.blkIndent)
    state.sCount[startLine] += state.blkIndent;

  // Tokenize the block
  state.md.block.tokenize(state, startLine, endLine);

  // Restore the previous state
  state.blkIndent -= 4;
  state.tShift[startLine] = tShift;
  state.sCount[startLine] = sCount;
  state.bMarks[startLine] = bMarks;

  // Create and push the closing token
  const closeToken = new state.Token("renderDefClose", "", -1);
  closeToken.level = --state.level;
  state.tokens.push(closeToken);
};

const processDef: ParserBlock.RuleBlock = (state, startLine, endLine, silent) => {
  const start = state.bMarks[startLine] + state.tShift[startLine];
  const max = state.eMarks[startLine];

  // Should be at least 5 chars ("[~x]:") and start with "[~"
  if (start + 4 > max || !_isOpen(state, start)) return false;

  // Find closing square bracket "]"
  let pos = start + 2;
  while (pos < max && !_isClose(state, pos)) pos++;

  // Empty label is not allowed
  if (pos === start + 2) return false;
  // No "]" found or no ":" after "]"
  if (pos + 1 >= max || state.src.charCodeAt(pos + 1) !== 0x3a /* : */) return false;

  if (silent) return true;

  // Extract content between "[~" and "]"
  const label = _extractLabel(state, start + 2, pos);

  // Process the blocks belonging to the definition
  _processDefToken(state, startLine, endLine, pos + 2, label);

  return true;
};

const processRef: ParserInline.RuleInline = (state, silent) => {
  if (!state.env.crossRef?.labelToId) return false;

  // Should be at least 4 chars ("[~x]") and start with "[~"
  if (state.pos + 3 > state.posMax || !_isOpen(state, state.pos)) return false;

  // Find closing square bracket "]"
  let pos = state.pos + 2;
  while (pos < state.posMax && !_isClose(state, pos)) pos++;

  // Empty label or no "]" found
  if (pos === state.pos + 2 || pos >= state.posMax) return false;

  // Extract content between "[~" and "]"
  const label = _extractLabel(state, state.pos + 2, pos);

  // No corresponding definition found
  if (state.env.crossRef.labelToId[label] === undefined) return false;

  if (!silent) {
    state.env.crossRef.list ??= [];

    const id =
      state.env.crossRef.labelToId[label] === -1
        ? state.env.crossRef.list.push(label) - 1
        : state.env.crossRef.labelToId[label];

    state.env.crossRef.labelToId[label] = id;

    const token = state.push("renderRef", "", 0);
    token.meta = { id, label };
  }

  state.pos = pos + 1;
  return true;
};

const postProcessDef: Core.RuleCore = (state) => {
  // We don't know the ID of the definition when we first encounter it,
  // so we need to go back and update it after we've processed all the references
  for (const token of state.tokens) {
    if (token.type === "renderDefOpen") {
      token.meta = {
        ...token.meta,
        id: state.env.crossRef?.labelToId?.[token.meta.label] ?? -1
      };
    }
  }
};

/**
 * A markdown-it plugin for cross-references.
 *
 * @example
 *
 * ```markdown
 * [~Reference name]: This is a reference.
 *
 *     It can span multiple lines.
 *
 * This is a reference to [~Reference name].
 * ```
 */
export const MarkdownItCrossRef: PluginSimple = (md) => {
  md.renderer.rules.renderRef = render("ref");
  md.renderer.rules.renderDefOpen = render("defOpen");
  md.renderer.rules.renderDefClose = () => "</li>\n</ul>\n";

  md.block.ruler.before("reference", "processDef", processDef, {
    alt: ["paragraph", "reference"]
  });
  md.inline.ruler.after("image", "processRef", processRef);
  md.core.ruler.after("inline", "postProcessDef", postProcessDef);
};

export default MarkdownItCrossRef;
