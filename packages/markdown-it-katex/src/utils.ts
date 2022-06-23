const htmlEscapeMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  '"': "&quot;"
};

const htmlEscapeRegexp = /[&<>'"]/g;

type K = keyof typeof htmlEscapeMap;

export const htmlEscape = (str: string): string => {
  return str.replace(htmlEscapeRegexp, (char) => htmlEscapeMap[char as K]);
};
