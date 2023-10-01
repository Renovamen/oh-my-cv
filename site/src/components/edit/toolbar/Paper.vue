<template>
  <ToolItem :text="$t('toolbar.paper')" icon="majesticons:paper-fold-line">
    <Combobox id="paper-size" :items="items" :initial="styles.paper" capitalize />
  </ToolItem>
</template>

<script lang="ts" setup>
import type { PaperType } from "~/types";

const { styles, setStyle } = useStyleStore();

const items = Object.keys(PAPER).map((paper) => ({
  label: paper,
  value: paper,
  onSelect: () => setStyle("paper", paper as PaperType)
}));
</script>
