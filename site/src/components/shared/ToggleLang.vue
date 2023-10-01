<template>
  <NavDropdown
    id="toggle language"
    :label="SUPPORT_LOCALES[locale as LocaleType].name"
    :items="items"
    icon="ic:round-translate"
  />
</template>

<script lang="ts" setup>
import { SUPPORT_LOCALES, type LocaleType } from "~/i18n";

const { availableLocales, locale } = useI18n();

const items = computed(() =>
  availableLocales.map((item: string) => ({
    link: switchLocale(item),
    label: SUPPORT_LOCALES[item as LocaleType].name,
    icon: SUPPORT_LOCALES[item as LocaleType].icon
  }))
);
</script>
