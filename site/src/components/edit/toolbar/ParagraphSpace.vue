<template>
  <ToolItem :text="$t('toolbar.paragraph')" icon="icon-park-outline:paragraph-break-two">
    <Slider
      id="paragrapg-space"
      unit="px"
      :default="styles.paragraphSpace"
      :max="50"
      :on-value-change="setParagraphSpace"
    />
  </ToolItem>
</template>

<script lang="ts" setup>
const { styles, setStyle } = useStyleStore();

const setParagraphSpace = (value: number) => setStyle("paragraphSpace", value);
</script>
