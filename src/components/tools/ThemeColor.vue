<template>
  <BaseButton tip="Theme color">
    <template #icon>
      <span
        class="w-3 h-3 pc:w-3.5 pc:h-3.5 rounded-sm"
        :style="{ backgroundColor: currentThemeColor }"
      />
    </template>

    <template #dropdown>
      <ul class="flex space-x-2 px-3 py-3 rounded">
        <li
          v-for="(color, i) in DEFAULT_THEME_COLORS"
          :key="`${i}-color`"
          class="w-5 h-5 rounded-sm text-white"
          :style="{ backgroundColor: color }"
          @click="pickColor(i)"
        >
          <div v-show="pickedColorId === i" class="w-full h-full flex-center">
            <span class="iconify" data-icon="line-md:confirm" />
          </div>
        </li>
        <li class="w-5 h-5 relative flex-center">
          <span class="iconify text-lg" data-icon="emojione:artist-palette" />
          <input
            class="absolute left-0 w-full h-full opacity-0 cursor-pointer"
            type="color"
            :value="customColor"
            @input="customizeColor"
          />
        </li>
      </ul>
    </template>
  </BaseButton>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { setStoreState } from "~/store";
import { onStylesUpdate, DEFAULT_THEME_COLORS } from "~/utils";
import BaseButton from "./BaseButton.vue";

const store = useStore();
const defaultColorId = DEFAULT_THEME_COLORS.findIndex(
  (item) => item === store.state.styles.themeColor
);

const pickedColorId = ref(defaultColorId);
const customColor = ref(DEFAULT_THEME_COLORS[defaultColorId]);
const currentThemeColor = computed(() =>
  pickedColorId.value === -1
    ? customColor.value
    : DEFAULT_THEME_COLORS[pickedColorId.value]
);

const pickColor = (i: number) => {
  pickedColorId.value = i;
  customColor.value = currentThemeColor.value;
};

const customizeColor = (e: Event) => {
  pickedColorId.value = -1;
  customColor.value = (e.target as HTMLInputElement).value;
};

watch(
  () => currentThemeColor.value,
  () => {
    setStoreState("styles", "themeColor", currentThemeColor.value);
    onStylesUpdate(store.state.styles);
  }
);
</script>
