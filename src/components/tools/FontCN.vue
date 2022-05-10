<template>
  <Button :text="styles.fontCN.name" :tip="t('tooltip.font_cn')">
    <template #icon>
      <span
        class="iconify"
        text="sm pc:base"
        data-icon="icon-park-outline:chinese"
      />
    </template>

    <template #dropdown>
      <Dropdown :items="items" />
    </template>
  </Button>
</template>

<script lang="ts" setup>
import { useStyleStore } from "~/store";
import { CN_FONTS } from "~/utils";

const { t } = useI18n();
const { styles, setFont } = useStyleStore();

const items = computed(() =>
  CN_FONTS.map((item) => ({
    text: item.name,
    function: ({ i }: { i: number }) => setFont("fontCN", CN_FONTS[i])
  }))
);
</script>
