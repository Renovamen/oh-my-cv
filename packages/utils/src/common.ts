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

export const copy = (obj: any) => JSON.parse(JSON.stringify(obj));
