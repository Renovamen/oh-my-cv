<template>
  <EditorToolbarBox :text="$t('toolbar.font_size')" icon="i-ri:font-size-2">
    <SharedUiSlider
      unit="px"
      :model-value="modelValue"
      :min="12"
      :max="20"
      @update:model-value="
        (value) => {
          modelValue = value!;
          setStyle('fontSize', value!.at(0)!);
        }
      "
    />
  </EditorToolbarBox>
</template>

<script lang="ts" setup>
const { styles, setStyle } = useStyleStore();

const modelValue = ref([styles.fontSize]);
</script>
