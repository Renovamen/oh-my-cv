export type ResumeStyles = {
  marginV: number;
  marginH: number;
  themeColor: string;
};

export type SystemData = {
  mdContent: string;
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
