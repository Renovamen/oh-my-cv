<template>
  <ToolItem :text="$t('toolbar.paper')" icon="i-majesticons:paper-fold-line">
    <Combobox id="paper-size" :items="items" :default="styles.paper" capitalize />
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
