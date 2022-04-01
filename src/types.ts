export type ResumeStyles = {
  marginV: number;
  marginH: number;
  themeColor: string;
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
