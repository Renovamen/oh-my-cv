import type { ResumeStyles } from "~/composables/stores/style";
import type { DbResume } from "./db";

/**
 * Write resume styles from local storage to the store
 *
 * @param styles resume styles
 */
const setResumeStyles = async (styles: ResumeStyles) => {
  const { setStyle } = useStyleStore();

  for (const [key, value] of Object.entries(styles)) {
    await setStyle(key as keyof ResumeStyles, value);
  }
};

/**
 * Write resume data from local storage to the store
 *
 * @param data resume data
 */
export const setResume = async (data: DbResume) => {
  const { setData } = useDataStore();

  setData("curResumeId", data.id);
  setData("curResumeName", data.name);

  setData("mdContent", data.markdown);
  setData("cssContent", data.css);

  await setResumeStyles(data.styles);
};

const _isFieldValid = (input: {
  object: any;
  fields: string | string[];
  required: string;
  allowUndefined?: boolean;
}) => {
  const { object, fields, required, allowUndefined = false } = input;

  if (typeof object !== "object") return false;

  return (Array.isArray(fields) ? fields : [fields]).every(
    (f) => typeof object[f] === required || (allowUndefined && object[f] === undefined)
  );
};

export class IsValid {
  static font = (font: any) =>
    typeof font === "object" &&
    typeof font.name === "string" &&
    ["string", "undefined"].includes(typeof font.fontFamily);

  static int = (str: any) => {
    if (typeof str !== "string") return false;
    return !isNaN(Number(str));
  };

  static resume = (item: any) => {
    const FIELDS = {
      data: {
        string: ["name", "markdown", "css", "updated_at", "created_at"]
      },
      styles: {
        number: ["fontSize", "lineHeight", "marginH", "marginV", "paragraphSpace"],
        string: ["paper", "themeColor"]
      }
    };

    if (!_isFieldValid({ object: item, fields: FIELDS.data.string, required: "string" }))
      return false;
    if (!_isFieldValid({ object: item, fields: "styles", required: "object" }))
      return false;

    const styles = item.styles;

    if (
      !_isFieldValid({ object: styles, fields: FIELDS.styles.number, required: "number" })
    )
      return false;
    if (
      !_isFieldValid({ object: styles, fields: FIELDS.styles.string, required: "string" })
    )
      return false;

    if (!this.font(styles.fontCJK) || !this.font(styles.fontEN)) return false;

    return true;
  };

  static importedJson = (data: any) => {
    return Object.entries(data).every(([id, item]) => this.int(id) && this.resume(item));
  };
}
