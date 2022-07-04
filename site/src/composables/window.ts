import { updatePreviewScale } from "~/utils";

export const watchWindowSize = () => {
  const { width } = useWindowSize();

  watch(width, () => setTimeout(() => updatePreviewScale(), 50));
};
