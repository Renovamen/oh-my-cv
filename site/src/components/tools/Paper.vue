<template>
  <ToolItem :text="t('toolbar.paper')" icon="majesticons:paper-fold-line">
    <AutoComplete
      :items="Object.keys(PAPER).map((paper) => ({ text: paper }))"
      :default="styles.paper"
      @select="(text: PaperType) => setStyle('paper', text)"
    />
  </ToolItem>
</template>

<script lang="ts" setup>
import { PAPER } from "~/utils";
import type { PaperType } from "~/types";

const { t } = useI18n();
const { styles, setStyle } = useStyleStore();
</script>
