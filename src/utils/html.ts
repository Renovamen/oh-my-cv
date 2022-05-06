const htmlEscapeMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  '"': "&quot;"
};

const htmlEscapeRegexp = /[&<>'"]/g;

export const htmlEscape = (str: string): string => {
  return str.replace(htmlEscapeRegexp, (char) => htmlEscapeMap[char]);
};
