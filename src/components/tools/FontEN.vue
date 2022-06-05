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
import { EN_FONTS } from "~/utils";

const { t } = useI18n();
const { styles, setFont } = useStyleStore();

const items = computed(() =>
  EN_FONTS.map((item) => ({
    text: item.name,
    function: ({ i }: { i: number }) => setFont("fontEN", EN_FONTS[i])
  }))
);
</script>
