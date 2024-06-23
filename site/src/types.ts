import type { ResumeStyles } from "~/composables/stores/style";

export type ResumeHeaderItem = {
  readonly text: string;
  readonly link?: string;
  readonly newLine?: boolean;
};

export type ResumeFrontMatter = {
  readonly name?: string;
  readonly header?: Array<ResumeHeaderItem>;
};

export type ResumeStorageItem = {
  name: string;
  markdown: string;
  css: string;
  styles: ResumeStyles;
  update: string;
};

export type ResumeStorage = {
  [id: string]: ResumeStorageItem;
};

export interface ResumeListItem extends ResumeStorageItem {
  id: string;
}
