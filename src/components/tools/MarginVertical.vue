<template>
  <Button :tip="t('tooltip.margin_v')">
    <template #icon>
      <span
        class="iconify"
        text="sm pc:base"
        data-icon="icon-park-outline:margin-one"
      />
    </template>

    <template #dropdown>
      <div class="w-7 pc:w-8 py-3">
        <Slider v-model="marginV" orientation="vertical" class="mx-auto" />
      </div>
    </template>
  </Button>
</template>

<script lang="ts" setup>
import Slider from "@vueform/slider";
import "@vueform/slider/themes/default.css";

const { t } = useI18n();
const { styles, setStyle } = useStyleStore();

const marginV = computed({
  get: () => styles.marginV,
  set: (value: number) => setStyle("marginV", value)
});
</script>
