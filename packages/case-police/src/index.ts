import { replaceCore, loadPresets, DISABLE_KEY, type Preset } from "./utils";

/**
 * Works like `case-police`'s CLI, but in the browser environment.
 *
 * @param code The code to correct.
 * @param options Options for case-police.
 *  - `ignore` A list of words to ignore.
 *  - `dict` Custom dictionary JSON, will be merged with original dict
 *  - `presets` Filter the default presets (softwares, products, general, brands, abbreviates)
 *
 * @returns
 *  - `{ code, changed }` The corrected code and a list of changed words, if any changes are made
 *  - `undefined` if the code contains `@case-police-disable` or no changes are made
 *
 * @see {@link CasePoliceReturn}
 */
export const replace = (
  code: string,
  options: {
    ignore?: string[];
    dict?: Record<string, string>;
    presets?: Preset[];
  } = {}
) => {
  if (code.includes(DISABLE_KEY)) return;

  const ignore = (options.ignore || []).map((i) => i.trim().toLowerCase());
  const dict = {
    ...loadPresets(options.presets),
    ...options.dict
  };

  return replaceCore(code, dict, ignore);
};

export default replace;

export type { Preset, CasePoliceReturn, ChangedCase } from "./utils";
