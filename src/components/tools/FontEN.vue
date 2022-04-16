<template>
  <BaseButton :text="pickedFontName">
    <template #icon>
      <span
        class="iconify text-sm sm:text-base"
        data-icon="icon-park-outline:english"
      />
    </template>

    <template #dropdown>
      <ul class="w-36">
        <li
          v-for="(font, i) in EN_FONTS"
          :key="`font-${i}-${font.name}`"
          class="flex items-center h-8 px-3 text-sm cursor-pointer bg-transparent hover:bg-gray-100 rounded-t"
          @click="pickFont(i)"
        >
          <p class="truncate">{{ font.name }}</p>
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
import { EN_FONTS, onStylesUpdate, handlePageBreak } from "../../utils";

const store = useStore();
const pickedFontName = computed(() => store.state.styles.fontEN.name);

const defaultFontId = EN_FONTS.findIndex(
  (item) => item.name === pickedFontName.value
);
const pickedFontId = ref(defaultFontId);
const pickedFont = computed(() => EN_FONTS[pickedFontId.value]);

const pickFont = (i: number) => {
  pickedFontId.value = i;
  setStoreState("styles", "fontEN", pickedFont.value);
  onStylesUpdate(store.state.styles, false);

  const pickedFontFamily = pickedFont.value.fontFamily || pickedFont.value.name;
  document.fonts.load(`12px ${pickedFontFamily}`).then(() => {
    handlePageBreak(store.state.styles);
  });
};
</script>
