export const PAPER_SIZES = {
  A4: {
    h: 297 + 2,
    w: 210
  },
  letter: {
    h: 279.4 + 3,
    w: 215.9
  }
};

export const MM_TO_PX = 3.78;

export type ValidPaperSize = keyof typeof PAPER_SIZES;
