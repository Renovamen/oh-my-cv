<template>
  <ToolItem :text="$t('toolbar.line')" icon="ic:round-format-line-spacing">
    <Slider
      id="line-height"
      :default="styles.lineHeight"
      :min="1"
      :max="2"
      :step="0.05"
      :on-value-change="setLineHeight"
    />
  </ToolItem>
</template>

<script lang="ts" setup>
const { styles, setStyle } = useStyleStore();

const setLineHeight = (value: number) => setStyle("lineHeight", value);
</script>
