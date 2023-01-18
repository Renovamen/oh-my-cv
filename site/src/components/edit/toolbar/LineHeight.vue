<template>
  <ToolItem :text="t('toolbar.line')" icon="ic:round-format-line-spacing">
    <vue-slider v-model="lineHeight" :min="1" :max="2" :interval="0.05" />
    <div flex justify-between text-light-c>
      <span>1</span>
      <span>1.5</span>
      <span>2</span>
    </div>
  </ToolItem>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { styles, setStyle } = useStyleStore();

const lineHeight = computed({
  get: () => styles.lineHeight,
  set: (value: number) => setStyle("lineHeight", value)
});
</script>
