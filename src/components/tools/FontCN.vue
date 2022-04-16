<template>
  <BaseButton :text="pickedFontName">
    <template #icon>
      <span
        class="iconify text-sm sm:text-base"
        data-icon="icon-park-outline:chinese"
      />
    </template>

    <template #dropdown>
      <ul class="w-25">
        <li
          v-for="(font, i) in CN_FONTS"
          :key="`font-${i}-${font.name}`"
          class="flex items-center px-3 h-8 text-sm cursor-pointer bg-transparent hover:bg-gray-100 dark:hover:bg-dark-200"
          :class="[
            i === 0 && 'rounded-t',
            i === CN_FONTS.length - 1 && 'rounded-b'
          ]"
          @click="pickFont(i)"
        >
          {{ font.name }}
        </li>
      </ul>
    </template>
  </BaseButton>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import BaseButton from "./BaseButton.vue";
import { setStoreState } from "../../store";
import { CN_FONTS, onStylesUpdate, handlePageBreak } from "../../utils";

const store = useStore();
const pickedFontName = computed(() => store.state.styles.fontCN.name);

const defaultFontId = CN_FONTS.findIndex(
  (item) => item.name === pickedFontName.value
);
const pickedFontId = ref(defaultFontId);
const pickedFont = computed(() => CN_FONTS[pickedFontId.value]);

const pickFont = (i: number) => {
  pickedFontId.value = i;
  setStoreState("styles", "fontCN", pickedFont.value);
  onStylesUpdate(store.state.styles, false);

  const pickedFontFamily = pickedFont.value.fontFamily || pickedFont.value.name;
  document.fonts.load(`12px ${pickedFontFamily}`).then(() => {
    handlePageBreak(store.state.styles);
  });
};
</script>
