import { getPreviewW } from "./constants";

export const updatePreviewScale = () => {
  const { width } = useWindowSize();
  const { setUI } = useUIStore();
  const { styles } = useStyleStore();

  const pane = document.querySelector(".preview-pane") as HTMLElement;
  const paneW = pane.clientWidth;

  const preview = document.querySelector(".preview") as HTMLElement;
  const previewH = preview.clientHeight;
  const previewW = getPreviewW(styles.paper);

  const previewScale =
    paneW >= previewW
      ? 1
      : (width.value <= previewW ? width.value : paneW) / previewW;

  setUI("previewScale", previewScale);
  setUI("previewBottom", -(1 - previewScale) * previewH);
};
