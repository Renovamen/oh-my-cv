export const useMobile = () => {
  const { width } = useWindowSize();

  const isLayoutMobile = computed(() => width.value <= 810);
  const isToolbarMobile = computed(() => width.value <= 1024);

  return {
    isLayoutMobile,
    isToolbarMobile
  };
};
