<template>
  <BaseButton>
    <template #icon>
      <span
        class="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-sm"
        :style="{ backgroundColor: currentThemeColor }"
      />
    </template>

    <template #dropdown>
      <ul class="flex space-x-2 px-3 py-3 rounded">
        <li
          v-for="(color, i) in DEFAULT_THEME_COLORS"
          :key="`${i}-color`"
          class="w-5 h-5 rounded-sm text-white flex items-center justify-center"
          :style="{ backgroundColor: color }"
          @click="pickColor(i)"
        />
        <li class="w-5 h-5 relative flex items-center justify-center">
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
import BaseButton from "./BaseButton.vue";
import { setStoreState } from "../../store";
import { onStylesUpdate, DEFAULT_THEME_COLORS } from "../../utils";

const store = useStore();

const pickedColorId = ref(1);
const customColor = ref(DEFAULT_THEME_COLORS[0]);
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
