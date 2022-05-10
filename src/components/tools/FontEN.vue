<template>
  <Button :text="styles.fontEN.name" :tip="t('tooltip.font_en')">
    <template #icon>
      <span
        class="iconify"
        text="sm pc:base"
        data-icon="icon-park-outline:english"
      />
    </template>

    <template #dropdown>
      <Dropdown :items="items" />
    </template>
  </Button>
</template>

<script lang="ts" setup>
import { useStyleStore } from "~/store";
import { EN_FONTS } from "~/utils";
import { resolveFonts } from "~/composables";

const { t } = useI18n();
const { styles } = useStyleStore();
const { toggleFont } = resolveFonts();

const items = computed(() =>
  EN_FONTS.map((item) => ({
    text: item.name,
    function: ({ i }: { i: number }) => toggleFont("fontEN", EN_FONTS[i])
  }))
);
</script>
