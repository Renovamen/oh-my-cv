export type ResumeStyles = {
  marginV: number;
  marginH: number;
  lineHeight: number;
  themeColor: string;
  fontCN: Font;
  fontEN: Font;
};

export type SystemData = {
  mdContent: string;
  fileImported: boolean;
};

export type UIData = {
  previewScale: number;
  previewBottom: number;
  dark: boolean;
};

export type StoreStates = ResumeStyles & SystemData & UIData;

export type ResumeHeaderItem = {
  text: string;
  link?: string;
  newLine?: boolean;
};

export type ResumeFrontMatter = {
  name?: string;
  header?: Array<ResumeHeaderItem>;
};

export type FrontMatterResults<T> = {
  readonly attributes: T;
  readonly body: string;
  readonly bodyBegin: number;
  readonly frontmatter?: string;
};

export type Font = {
  readonly name: string;
  readonly fontFamily?: string;
};
