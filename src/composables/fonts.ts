export const fontLoader = (fonts: string | Array<string>) => {
  const observers = [];

  for (const font of typeof fonts === "string" ? [fonts] : fonts)
    observers.push(document.fonts.load(`12px ${font}`));

  return Promise.all(observers);
};

export const resolveFonts = () => {
  const store = useStore();

  const fontFamilyEN = computed(
    () => store.state.styles.fontEN.fontFamily || store.state.styles.fontEN.name
  );
  const fontFamilyCN = computed(
    () => store.state.styles.fontCN.fontFamily || store.state.styles.fontCN.name
  );

  const onFontLoaded = computed(() =>
    fontLoader([fontFamilyEN.value, fontFamilyCN.value])
  );

  return {
    fontFamilyEN,
    fontFamilyCN,
    onFontLoaded
  };
};
