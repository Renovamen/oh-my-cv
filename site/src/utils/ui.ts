import { getPaperW, getPaperH } from "./constants";

export const fitPreviewWidth = () => {
  const { width } = useWindowSize();
  const { styles } = useStyleStore();
  const { setUI } = useUIStore();

  const pane = document.querySelector(".preview-pane") as HTMLElement;
  const paneW = pane.clientWidth;
  const paperW = getPaperW(styles.paper);

  const previewScale = (width.value <= paperW ? width.value : paneW) / paperW;
  setUI("previewScale", previewScale);

  updatePreviewScale();
};

export const fitPreviewHeight = () => {
  const { styles } = useStyleStore();
  const { setUI } = useUIStore();

  const pane = document.querySelector(".preview-pane") as HTMLElement;
  const paneH = pane.clientHeight;
  const paperH = getPaperH(styles.paper);

  const previewScale = paneH / paperH;
  setUI("previewScale", previewScale);

  updatePreviewScale();
};

export const updatePreviewScale = () => {
  const { ui, setUI } = useUIStore();
  const { styles } = useStyleStore();

  const pane = document.querySelector(".preview-pane") as HTMLElement;
  const paneW = pane.clientWidth;

  const preview = document.querySelector(".preview") as HTMLElement;
  const previewH = preview.clientHeight;
  const paperW = getPaperW(styles.paper);

  setUI("previewLeft", Math.max(0, (paneW - ui.previewScale * paperW) / 2));
  setUI("previewBottom", Math.min(0, (ui.previewScale - 1) * previewH));
  setUI("previewRight", Math.min(0, (ui.previewScale - 1) * paperW));
};
