<template>
  <BaseButton :text="pickedFontName">
    <template #icon>
      <span
        class="iconify"
        text="sm sm:base"
        data-icon="icon-park-outline:english"
      />
    </template>

    <template #dropdown>
      <ul class="w-36">
        <li
          v-for="(font, i) in EN_FONTS"
          :key="`font-${i}-${font.name}`"
          class="menu-li"
          :class="[
            i === 0 && 'rounded-t',
            i === EN_FONTS.length - 1 && 'rounded-b'
          ]"
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
import { useFonts } from "../../composables";

const store = useStore();
const pickedFontName = computed(() => store.state.styles.fontEN.name);

const defaultFontId = EN_FONTS.findIndex(
  (item) => item.name === pickedFontName.value
);
const pickedFontId = ref(defaultFontId);
const pickedFont = computed(() => EN_FONTS[pickedFontId.value]);

const { onFontLoaded } = useFonts();

const pickFont = (i: number) => {
  pickedFontId.value = i;

  setStoreState("styles", "fontEN", pickedFont.value);
  onStylesUpdate(store.state.styles, false);

  onFontLoaded.value.then(() => handlePageBreak(store.state.styles));
};
</script>
