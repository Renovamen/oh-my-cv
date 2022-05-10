<template>
  <Button :tip="t('tooltip.margin_h')">
    <template #icon>
      <span
        class="iconify"
        text="sm pc:base"
        data-icon="icon-park-outline:margin"
      />
    </template>

    <template #dropdown>
      <div class="w-7 pc:w-8 py-3">
        <Slider v-model="marginH" orientation="vertical" class="mx-auto" />
      </div>
    </template>
  </Button>
</template>

<script lang="ts" setup>
import Slider from "@vueform/slider";
import "@vueform/slider/themes/default.css";
import { useStyleStore } from "~/store";

const { t } = useI18n();
const { styles, setStyle } = useStyleStore();

const marginH = computed({
  get: () => styles.marginH,
  set: (value: number) => setStyle("marginH", value)
});
</script>
