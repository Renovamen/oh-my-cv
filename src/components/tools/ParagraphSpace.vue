<template>
  <Button :tip="t('tooltip.paragraph')">
    <template #icon>
      <span
        class="iconify"
        text="sm pc:base"
        data-icon="icon-park-outline:paragraph-break-two"
      />
    </template>

    <template #dropdown>
      <div class="w-7 pc:w-8 py-3">
        <Slider
          v-model="paragraphSpace"
          :max="50"
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

const { t } = useI18n();
const { styles, setStyle } = useStyleStore();

const paragraphSpace = computed({
  get: () => styles.paragraphSpace,
  set: (value: number) => setStyle("paragraphSpace", value)
});
</script>
