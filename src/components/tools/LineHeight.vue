<template>
  <Button :tip="t('tooltip.line')">
    <template #icon>
      <span
        class="iconify"
        text="base pc:lg"
        data-icon="ic:round-format-line-spacing"
      />
    </template>

    <template #dropdown>
      <div class="w-7 pc:w-8 py-3">
        <Slider
          v-model="lineHeight"
          :min="100"
          :max="200"
          :step="5"
          :format="(value: number) => value / 100"
          orientation="vertical"
          class="mx-auto"
        />
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

const lineHeight = computed({
  get: () => styles.lineHeight,
  set: (value: number) => setStyle("lineHeight", value)
});
</script>
