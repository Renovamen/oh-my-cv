import { replace } from "./utils";

export const correctCase = (text: string, disable?: string[]) => {
  const disabled = (disable || []).map((i: string) => i.trim().toLowerCase());

  return replace(text, disabled);
};

export default correctCase;
