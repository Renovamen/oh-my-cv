import { setStoreState } from "~/store";
import { getPreviewW } from "./constants";
import type { PaperType } from "~/types";

export const updatePreviewScale = (paper: PaperType) => {
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
