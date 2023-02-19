<template>
  <ToolItem :text="t('toolbar.margin')" icon="radix-icons:margin">
    <div mb-4 text-light-c>
      <div hstack space-x-1 justify-end>
        <span class="iconify" data-icon="icon-park-outline:margin-one" />
        <span>{{ t("toolbar.vertical") }}</span>
      </div>
      <vue-slider v-model="marginV" />
      <div flex justify-between>
        <span>0px</span>
        <span>50px</span>
        <span>100px</span>
      </div>
    </div>

    <div text-light-c>
      <div hstack space-x-1 justify-end>
        <span class="iconify" data-icon="icon-park-outline:margin" />
        <span>{{ t("toolbar.horizontal") }}</span>
      </div>
      <vue-slider v-model="marginH" />
      <div flex justify-between>
        <span>0px</span>
        <span>50px</span>
        <span>100px</span>
      </div>
    </div>
  </ToolItem>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { styles, setStyle } = useStyleStore();

const marginV = computed({
  get: () => styles.marginV,
  set: (value: number) => setStyle("marginV", value)
});

const marginH = computed({
  get: () => styles.marginH,
  set: (value: number) => setStyle("marginH", value)
});
</script>
