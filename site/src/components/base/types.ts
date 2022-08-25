export type DropdownItem = {
  readonly text: string;
  readonly note?: string;
  readonly icon?: string;
  readonly link?: string;
  readonly function?: ({ text, i }: { text: string; i: number }) => void;
  readonly border?: boolean;
};
