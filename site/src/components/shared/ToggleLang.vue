<template>
  <NavDropdown
    id="toggle language"
    :label="localeName"
    :items="items"
    icon="i-ic:round-translate"
  />
</template>

<script lang="ts" setup>
const switchLocalePath = useSwitchLocalePath();
const { locale, locales } = useI18n();

const availableLocales = computed(() =>
  locales.value.filter((i) => i.code !== locale.value)
);

const localeName = computed(
  () => locales.value.find((i) => i.code === locale.value)?.name || ""
);

const items = availableLocales.value.map((item) => ({
  link: switchLocalePath(item.code),
  label: item.name!,
  icon: item.icon
}));
</script>
