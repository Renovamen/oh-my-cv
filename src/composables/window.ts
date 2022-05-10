import { updatePreviewScale } from "~/utils";

export const resolveWindowSize = () => {
  const { width } = useWindowSize();

  const isMobile = computed(() => width.value <= 810);

  watch(
    () => width.value,
    () => setTimeout(() => updatePreviewScale(), 50)
  );

  return {
    width,
    isMobile
  };
};
