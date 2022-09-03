import { replace } from "./utils";

export const correctCase = async (text: string, disable?: string[]) => {
  const disabled = (disable || []).map((i: string) => i.trim().toLowerCase());

  return await replace(text, disabled);
};

export default correctCase;
