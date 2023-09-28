const defaultLocale = "en";

export const watchLocale = () => {
  const { availableLocales, locale } = useI18n();
  const route = useRoute();

  const checkLocale = (toLocale: string) => {
    return !(availableLocales.indexOf(toLocale) === -1);
  };

  const getCurrentLocale = () => {
    const l = route.params.lang === "" ? defaultLocale : route.params.lang[0];
    return checkLocale(l) ? l : defaultLocale;
  };

  locale.value = getCurrentLocale();

  watch(
    () => route.params.lang,
    () => (locale.value = getCurrentLocale())
  );
};

export const switchLocale = (toLocale: string) => {
  const { locale } = useI18n();
  const route = useRoute();

  const basePath =
    locale.value === defaultLocale
      ? route.path
      : route.path.replace(`/${locale.value}`, "");

  const toPath = toLocale === defaultLocale ? basePath : `/${toLocale}${basePath}`;
  return toPath;
};

export const switchPath = (path: string, locale: string) => {
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  return `${prefix}${path[0] === "/" ? "" : "/"}${path}`;
};
