export const useMobile = () => {
  const { width } = useWindowSize();
  return computed(() => width.value <= 1024);
};
