export type ResumeStyles = {
  marginV: number;
  marginH: number;
  themeColor: string;
  fontCN: Font;
  fontEN: Font;
};

export type SystemData = {
  mdContent: string;
  fileImported: boolean;
};

export type StoreStates = ResumeStyles & SystemData;

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
