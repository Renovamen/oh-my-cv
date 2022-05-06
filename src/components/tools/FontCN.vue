<template>
  <BaseButton :text="pickedFontName">
    <template #icon>
      <span
        class="iconify"
        text="sm sm:base"
        data-icon="icon-park-outline:chinese"
      />
    </template>

    <template #dropdown>
      <ul class="w-25">
        <li
          v-for="(font, i) in CN_FONTS"
          :key="`font-${i}-${font.name}`"
          class="menu-li"
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
import { setStoreState } from "~/store";
import { CN_FONTS, onStylesUpdate, handlePageBreak } from "~/utils";
import { useFonts } from "~/composables";
import BaseButton from "./BaseButton.vue";

const store = useStore();
const pickedFontName = computed(() => store.state.styles.fontCN.name);

const defaultFontId = CN_FONTS.findIndex(
  (item) => item.name === pickedFontName.value
);
const pickedFontId = ref(defaultFontId);
const pickedFont = computed(() => CN_FONTS[pickedFontId.value]);

const { onFontLoaded } = useFonts();

const pickFont = (i: number) => {
  pickedFontId.value = i;

  setStoreState("styles", "fontCN", pickedFont.value);
  onStylesUpdate(store.state.styles, false);

  onFontLoaded.value.then(() => handlePageBreak(store.state.styles));
};
</script>
