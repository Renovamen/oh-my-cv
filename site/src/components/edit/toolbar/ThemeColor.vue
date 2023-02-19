<template>
  <ToolItem
    :text="t('toolbar.theme_color')"
    icon="material-symbols:palette-outline"
  >
    <ul class="flex justify-between mb-4">
      <li
        v-for="(color, i) in THEME_COLORS"
        :key="`${i}-color`"
        class="w-6 h-6 rounded text-white"
        :style="{ backgroundColor: color }"
        @click="pickColor(i)"
      >
        <div v-show="pickedColorId === i" class="w-full h-full flex-center">
          <span class="iconify" data-icon="line-md:confirm" />
        </div>
      </li>
    </ul>

    <OnClickOutside
      class="relative hstack h-9 space-x-2 px-2 py-1 rounded border uppercase"
      :class="[isFocus && 'border-darker-c', !isFocus && 'border-c']"
      @click="isFocus = true"
      @trigger="isFocus = false"
    >
      <span
        class="w-4 h-4 rounded-sm"
        :style="{ backgroundColor: currentThemeColor }"
      />
      <span>{{ customColor }}</span>
      <input
        class="absolute -left-2 w-full h-full opacity-0 cursor-pointer"
        type="color"
        :value="customColor"
        @input="customizeColor"
      />
    </OnClickOutside>
  </ToolItem>
</template>

<script lang="ts" setup>
import { OnClickOutside } from "@vueuse/components";
import { THEME_COLORS } from "~/utils";

const { t } = useI18n();
const { styles, setStyle } = useStyleStore();

const isFocus = ref(false);

const pickedColorId = ref(-1);
const customColor = ref("");

const getColorId = (color: string) =>
  THEME_COLORS.findIndex((item) => item === color);

const resetDisplayColor = () => {
  pickedColorId.value = getColorId(styles.themeColor);
  customColor.value = styles.themeColor;
};

resetDisplayColor();

const currentThemeColor = computed(() =>
  pickedColorId.value === -1
    ? customColor.value
    : THEME_COLORS[pickedColorId.value]
);

const pickColor = (i: number) => {
  pickedColorId.value = i;
  customColor.value = currentThemeColor.value;
};

const customizeColor = (e: Event) => {
  customColor.value = (e.target as HTMLInputElement).value;
  pickedColorId.value = getColorId(customColor.value);
};

watch(currentThemeColor, () => setStyle("themeColor", currentThemeColor.value));

watch(() => styles.themeColor, resetDisplayColor);
</script>
