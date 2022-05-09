<template>
  <Button :text="SUPPORT_LOCALES[locale].name" :tip="t('lang')">
    <template #icon>
      <span class="iconify" text="sm pc:base" data-icon="ic:round-translate" />
    </template>

    <template #dropdown>
      <Dropdown :items="items" />
    </template>
  </Button>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { switchLocalePath } from "~/composables";
import { SUPPORT_LOCALES, LocaleType } from "~/i18n";
import Button from "~/components/base/Button.vue";
import Dropdown from "~/components/base/Dropdown.vue";

const { availableLocales, locale, t } = useI18n();

const items = computed(() =>
  availableLocales.map((item: string) => ({
    link: switchLocalePath(item),
    text: SUPPORT_LOCALES[item as LocaleType].name,
    icon: SUPPORT_LOCALES[item as LocaleType].icon
  }))
);
</script>
