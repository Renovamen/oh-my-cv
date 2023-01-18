<template>
  <ToolItem :text="t('toolbar.font_size')" icon="ri:font-size-2">
    <vue-slider v-model="fontSize" :min="12" :max="20" />
    <div flex justify-between text-light-c>
      <span>12px</span>
      <span>16px</span>
      <span>20px</span>
    </div>
  </ToolItem>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { styles, setStyle } = useStyleStore();

const fontSize = computed({
  get: () => styles.fontSize,
  set: (value: number) => setStyle("fontSize", value)
});
</script>
