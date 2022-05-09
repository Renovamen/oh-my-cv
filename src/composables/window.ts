import { updatePreviewScale } from "~/utils";

export const resolveWindowSize = () => {
  const store = useStore();
  const { width } = useWindowSize();

  const isMobile = computed(() => width.value <= 810);

  watch(
    () => width.value,
    () => setTimeout(() => updatePreviewScale(store.state.styles.paper), 50)
  );

  return {
    width,
    isMobile
  };
};
