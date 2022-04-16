import { useWindowSize } from "@vueuse/core";
import { setStoreState } from "../store";

export const updatePreviewScale = () => {
  const { width } = useWindowSize();

  const pane = document.querySelector(".preview-pane") as HTMLElement;
  const paneW = pane.clientWidth;

  const preview = document.querySelector(".preview-container") as HTMLElement;
  const previewH = preview.clientHeight;

  const previewScale =
    paneW >= 804 ? 1 : (width.value <= 810 ? width.value : paneW) / 804;
  setStoreState("ui", "previewScale", previewScale);
  setStoreState("ui", "previewBottom", -(1 - previewScale) * previewH);
};
