<template>
  <EditorToolbarBox :text="$t('toolbar.margins.title')" icon="i-radix-icons:margin">
    <div hstack text-muted-foreground gap-x-1 justify-end>
      <span i-icon-park-outline:margin-one />
      {{ $t("toolbar.margins.vertical") }}
    </div>

    <SharedUiSlider
      unit="px"
      :model-value="vModelValue"
      @update:model-value="
        (value) => {
          vModelValue = value!;
          setStyle('marginV', value!.at(0)!);
        }
      "
    />

    <div mt-4 hstack text-muted-foreground gap-x-1 justify-end>
      <span i-icon-park-outline:margin />
      {{ $t("toolbar.margins.horizontal") }}
    </div>

    <SharedUiSlider
      unit="px"
      :model-value="hModelValue"
      @update:model-value="
        (value) => {
          hModelValue = value!;
          setStyle('marginH', value!.at(0)!);
        }
      "
    />
  </EditorToolbarBox>
</template>

<script lang="ts" setup>
const { styles, setStyle } = useStyleStore();

const vModelValue = ref([styles.marginV]);
const hModelValue = ref([styles.marginH]);
</script>
