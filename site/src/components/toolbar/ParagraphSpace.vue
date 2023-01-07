<template>
  <ToolItem
    :text="t('toolbar.paragraph')"
    icon="icon-park-outline:paragraph-break-two"
  >
    <vue-slider v-model="paragraphSpace" :max="50" />
    <div flex justify-between text-light-c>
      <span>0px</span>
      <span>25px</span>
      <span>50px</span>
    </div>
  </ToolItem>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { styles, setStyle } = useStyleStore();

const paragraphSpace = computed({
  get: () => styles.paragraphSpace,
  set: (value: number) => setStyle("paragraphSpace", value)
});
</script>
