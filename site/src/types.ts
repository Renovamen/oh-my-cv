import type { PartialWithRequired } from "@renovamen/utils";
import type { ResumeStyles } from "~/composables/stores/style";

export type ResumeItemEmpty = {
  name: string;
  markdown: string;
  css: string;
  styles: ResumeStyles;
};

export interface ResumeItem extends ResumeItemEmpty {
  id: string;
  update: string;
  created_at: string;
}

export type ResumeItemUpdate = PartialWithRequired<ResumeItem, "id">;
