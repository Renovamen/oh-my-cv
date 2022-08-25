export const isClient = typeof window !== "undefined";

export const isMac = isClient
  ? /mac/i.test(navigator.userAgentData?.platform || navigator.platform)
  : false;

export const isExternal = (path: string) => {
  const outboundRE = /^(https?:|mailto:|tel:)/;
  return outboundRE.test(path);
};
