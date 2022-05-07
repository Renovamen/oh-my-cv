import { useWindowSize } from "@vueuse/core";
import { setStoreState } from "../store";
import { getPreviewW } from "./constants";

export const updatePreviewScale = (paper: string) => {
  const { width } = useWindowSize();

  const pane = document.querySelector(".preview-pane") as HTMLElement;
  const paneW = pane.clientWidth;

  const preview = document.querySelector(".preview") as HTMLElement;
  const previewH = preview.clientHeight;
  const previewW = getPreviewW(paper);

  const previewScale =
    paneW >= previewW
      ? 1
      : (width.value <= previewW + 5 ? width.value : paneW) / previewW;
  setStoreState("ui", "previewScale", previewScale);
  setStoreState("ui", "previewBottom", -(1 - previewScale) * previewH);
};
