/* eslint-disable @typescript-eslint/no-explicit-any */

// Adapted from https://github.com/jxson/front-matter

import * as yaml from "js-yaml";
import { FrontMatterResults } from "./types";

const optionalByteOrderMark = "\\ufeff?";
const platform = typeof process !== "undefined" ? process.platform : "";
const pattern =
  "^(" +
  optionalByteOrderMark +
  "(= yaml =|---)" +
  "$([\\s\\S]*?)" +
  "^(?:\\2|\\.\\.\\.)\\s*" +
  "$" +
  (platform === "win32" ? "\\r?" : "") +
  "(?:\\n)?)";

// NOTE: If this pattern uses the 'g' flag the `regex` variable definition will
// need to be moved down into the functions that use it.
const regex = new RegExp(pattern, "m");

const computeLocation = (match: RegExpExecArray, body: string): number => {
  let line = 1;
  let pos = body.indexOf("\n");
  const offset = match.index + match[0].length;

  while (pos !== -1) {
    if (pos >= offset) return line;
    line++;
    pos = body.indexOf("\n", pos + 1);
  }

  return line;
};

let lastAttributes = {} as any;

const parse = (string: string): FrontMatterResults<any> => {
  const match = regex.exec(string);

  if (!match) {
    return {
      attributes: {},
      body: string,
      bodyBegin: 1
    };
  }

  const yamlString = match[match.length - 1].replace(/^\s+|\s+$/g, "");
  const body = string.replace(match[0], "");
  const line = computeLocation(match, string);

  try {
    const attributes = yaml.load(yamlString) || {};
    lastAttributes = attributes;

    return {
      attributes: attributes,
      body: body,
      bodyBegin: line,
      frontmatter: yamlString
    };
  } catch (e) {
    // This may happen when users haven't completed the front matter.
    // So returns the last successfully parsed attributes.
    return {
      attributes: lastAttributes,
      body: body,
      bodyBegin: line,
      frontmatter: yamlString
    };
  }
};

export const extractFrontMatter = (string: string): FrontMatterResults<any> => {
  string = string || "";

  const lines = string.split(/(\r?\n)/);
  if (lines[0] && /= yaml =|---/.test(lines[0])) {
    return parse(string);
  } else {
    return {
      attributes: {},
      body: string,
      bodyBegin: 1
    };
  }
};

export const testFrontMatter = (string: string): boolean => {
  return regex.test(string || "");
};
