export type DropdownItem = {
  readonly text: string;
  readonly icon?: string;
  readonly link?: string;
  readonly function?: ({ text, i }: { text: string; i: number }) => void;
};
