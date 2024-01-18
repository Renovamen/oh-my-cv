<template>
  <ToolItem :text="$t('toolbar.font_size')" icon="ri:font-size-2">
    <Slider
      id="font-size"
      unit="px"
      :default="styles.fontSize"
      :min="12"
      :max="20"
      :on-value-change="setFontSize"
    />
  </ToolItem>
</template>

<script lang="ts" setup>
const { styles, setStyle } = useStyleStore();

const setFontSize = (value: number) => setStyle("fontSize", value);
</script>
