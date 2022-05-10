<template>
  <Button :text="styles.paper" :tip="t('tooltip.paper')">
    <template #icon>
      <span
        class="iconify"
        text="sm pc:base"
        data-icon="majesticons:paper-fold-line"
      />
    </template>

    <template #dropdown>
      <Dropdown :items="items" />
    </template>
  </Button>
</template>

<script lang="ts" setup>
import { useStyleStore } from "~/store";
import { PAPER } from "~/utils";
import type { PaperType } from "~/types";

const { t } = useI18n();
const { styles, setStyle } = useStyleStore();

const items = computed(() =>
  Object.keys(PAPER).map((paper) => ({
    text: paper,
    function: ({ text }: { text: PaperType }) => setStyle("paper", text)
  }))
);
</script>
