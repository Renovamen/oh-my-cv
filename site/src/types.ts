import type { ViteSSGContext } from "vite-ssg";
import { PAPER } from "~/utils";

export type UserModule = (ctx: ViteSSGContext) => void;

export type PaperType = keyof typeof PAPER;

export type ResumeStyles = {
  marginV: number;
  marginH: number;
  lineHeight: number;
  paragraphSpace: number;
  themeColor: string;
  fontCN: Font;
  fontEN: Font;
  fontSize: number;
  paper: PaperType;
};

export type SystemData = {
  mdContent: string;
  fileImported: boolean;
  curResumeId: string | null;
  curResumeName: string;
};

export type UIData = {
  previewScale: number;
  previewBottom: number;
  openToolbar: boolean;
};

export type ToastFlagData = {
  save: boolean | string;
  delete: boolean | string;
  switch: boolean | string;
  new: boolean | string;
};

export type ResumeHeaderItem = {
  text: string;
  link?: string;
  newLine?: boolean;
};

export type ResumeFrontMatter = {
  name?: string;
  header?: Array<ResumeHeaderItem>;
};

export type Font = {
  readonly name: string;
  readonly fontFamily?: string;
};

export type ResumeStorageItem = {
  name: string;
  content: string;
  styles: ResumeStyles;
};

export type ResumeStorage = {
  [id: string]: ResumeStorageItem;
};
