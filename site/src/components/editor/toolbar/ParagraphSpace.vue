<template>
  <EditorToolbarBox
    :text="$t('toolbar.paragraph_spacing')"
    icon="i-icon-park-outline:paragraph-break-two"
  >
    <SharedUiSlider
      unit="px"
      :model-value="modelValue"
      :max="50"
      @update:model-value="
        (value) => {
          modelValue = value!;
          setStyle('paragraphSpace', value!.at(0)!);
        }
      "
    />
  </EditorToolbarBox>
</template>

<script lang="ts" setup>
const { styles, setStyle } = useStyleStore();

const modelValue = ref([styles.paragraphSpace]);
</script>
