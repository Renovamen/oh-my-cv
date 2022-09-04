export type Category =
  | "sans-serif"
  | "serif"
  | "display"
  | "handwriting"
  | "monospace";

export type Subset =
  | "arabic"
  | "bengali"
  | "chinese-simplified"
  | "chinese-traditional"
  | "cyrillic"
  | "cyrillic-ext"
  | "devanagari"
  | "greek"
  | "greek-ext"
  | "gujarati"
  | "gurmukhi"
  | "hebrew"
  | "japanese"
  | "kannada"
  | "khmer"
  | "korean"
  | "latin"
  | "latin-ext"
  | "malayalam"
  | "myanmar"
  | "oriya"
  | "sinhala"
  | "tamil"
  | "telugu"
  | "thai"
  | "vietnamese";

export type Variant =
  | "100"
  | "100italic"
  | "200"
  | "200italic"
  | "300"
  | "300italic"
  | "regular"
  | "italic"
  | "500"
  | "500italic"
  | "600"
  | "600italic"
  | "700"
  | "700italic"
  | "800"
  | "800italic"
  | "900"
  | "900italic";

export type Font = {
  family: string;
  id: string;
  category: Category;
  subsets: Subset[];
  variants: Variant[];

  kind?: string; // Usually "webfonts#webfont"
  version?: string; // Version number
  lastModified?: string; // Date of last modification (yyyy-MM-dd)
  files?: Record<Variant, string>; // Font file for each variant
};

export type FontMap = Map<string, Font>;

export type SortOption = "alphabet" | "popularity";

export type Options = {
  families?: string[];
  categories?: Category[];
  subsets?: Subset[];
  variants?: Variant[];
  filter?: (font: Font) => boolean;
  limit?: number;
  sort?: SortOption;
};
