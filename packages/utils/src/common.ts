export const isClient = typeof window !== "undefined";

export const isMac = isClient
  ? /mac/i.test(navigator.userAgentData?.platform || navigator.platform)
  : false;

export const isExternal = (path: string) => {
  const outboundRE = /^(https?:|mailto:|tel:)/;
  return outboundRE.test(path);
};

// https://github.com/meteorlxy/vscode-slugify
export const slugify = (str: string) =>
  encodeURI(
    str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace whitespace with -
      .replace(
        /[\]\[\!\'\#\$\%\&\(\)\*\+\,\.\/\:\;\<\=\>\?\@\\\^\_\{\|\}\~\`。，、；：？！…—·ˉ¨‘’“”々～‖∶＂＇｀｜〃〔〕〈〉《》「」『』．〖〗【】（）［］｛｝]/g,
        ""
      ) // Remove known punctuators
      .replace(/^\-+/, "") // Remove leading -
      .replace(/\-+$/, "") // Remove trailing -
  );

export const htmlEscape = (str: string) => {
  const escapeMap: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  };

  return str.replace(/[&<>'"]/g, (char) => escapeMap[char]);
};

export const copy = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") {
    throw new Error("Input must be a non-null object.");
  }
  return JSON.parse(JSON.stringify(obj));
};

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
