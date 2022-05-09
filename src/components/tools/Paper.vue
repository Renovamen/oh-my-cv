<template>
  <Button :text="store.state.styles.paper" :tip="t('tooltip.paper')">
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
import { setStoreState } from "~/store";
import { onStylesUpdate, PAPER } from "~/utils";
import type { PaperType } from "~/types";

const store = useStore();
const { t } = useI18n();

const pickPaper = (paper: PaperType) => {
  setStoreState("styles", "paper", paper);
  onStylesUpdate(store.state.styles);
};

const items = computed(() =>
  Object.keys(PAPER).map((paper) => ({
    text: paper,
    function: ({ text }: { text: PaperType }) => pickPaper(text)
  }))
);
</script>
