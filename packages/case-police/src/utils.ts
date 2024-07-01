/**
 * @fileoverview This file is modified from https://github.com/antfu/case-police/blob/main/packages/case-police/src/utils.ts.
 *
 * The original file relies on Node.js APIs, which are removed in this file, so that
 * this package can be used in the browser environment.
 */

import abbreviates from "case-police/dict/abbreviates.json" assert { type: "json" };
import brands from "case-police/dict/brands.json" assert { type: "json" };
import general from "case-police/dict/general.json" assert { type: "json" };
import products from "case-police/dict/products.json" assert { type: "json" };
import softwares from "case-police/dict/softwares.json" assert { type: "json" };

export type Preset = "softwares" | "products" | "general" | "brands" | "abbreviates";

export type ChangedCase = {
  from: string;
  to: string;
  index: number;
};

export type CasePoliceReturn = {
  code: string;
  changed: ChangedCase[];
};

export const DISABLE_KEY = "@case-police-disable";
export const IGNORE_REGEX = /@case-police-ignore\s+([^\s]+)/g;

export const UTF8_RANGE = "[\u0080-\uFFFF]";

export const AVALIABLE_PRESETS: Record<Preset, Record<string, string>> = {
  softwares,
  products,
  general,
  brands,
  abbreviates
};

export function buildRegex(dictionary: Record<string, string>): RegExp {
  const keys = Object.keys(dictionary);
  const regex = new RegExp(`\\b(${keys.join("|").replace(/\+/g, "\\+")})\\b`, "gi");
  return regex;
}

export function replaceCore(
  code: string,
  dict: Record<string, string>,
  ignore: string[] = [],
  output?: (code: string, index: number, from: string, to: string) => void,
  regex?: RegExp
): CasePoliceReturn | undefined {
  regex = regex || buildRegex(dict);

  Array.from(code.matchAll(IGNORE_REGEX)).forEach((match) => {
    const [, key] = match;
    ignore.push(
      ...key
        .split(",")
        .map((k) => k.trim().toLowerCase())
        .filter(Boolean)
    );
  });

  const changed = [] as ChangedCase[];

  code = code.replace(regex, (_, from: string, index: number) => {
    if (containsUTF8(code, from, index)) return _;

    if (!from.match(/[A-Z]/) || !from.match(/[a-z]/)) return _;

    const lower = from.toLowerCase();
    if (ignore.includes(lower)) return _;

    const to = dict[lower];
    if (!to || to === from) return _;

    changed.push({ from, to, index });
    output?.(code, index, from, to);

    return to;
  });

  if (changed.length) return { code, changed };
}

function containsUTF8(code: string, key: string, index: number) {
  const utf8Regex = new RegExp(`${UTF8_RANGE}`);
  const head = code.charAt(index - 1);
  const tail = code.charAt(index + key.length);
  return utf8Regex.test(head) || utf8Regex.test(tail);
}

export function loadPresets(presets?: Preset[]): Record<string, string> {
  presets = presets ?? (Object.keys(AVALIABLE_PRESETS) as Preset[]);

  return presets.reduce(
    (dictionary, preset) => ({
      ...dictionary,
      ...AVALIABLE_PRESETS[preset]
    }),
    {}
  );
}
