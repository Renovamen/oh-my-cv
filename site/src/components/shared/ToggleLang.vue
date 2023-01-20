<template>
  <NavItem
    :text="SUPPORT_LOCALES[locale as LocaleType].name"
    icon="ic:round-translate"
  >
    <Dropdown :items="items" />
  </NavItem>
</template>

<script lang="ts" setup>
import { SUPPORT_LOCALES, LocaleType } from "~/i18n";

const { availableLocales, locale } = useI18n();

const items = computed(() =>
  availableLocales.map((item: string) => ({
    link: switchLocale(item),
    text: SUPPORT_LOCALES[item as LocaleType].name,
    icon: SUPPORT_LOCALES[item as LocaleType].icon
  }))
);
</script>
