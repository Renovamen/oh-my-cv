<template>
  <BaseButton :text="pickedFontName">
    <template #icon>
      <span
        class="iconify text-sm sm:text-base"
        data-icon="icon-park-outline:chinese"
      />
    </template>

    <template #dropdown>
      <ul class="w-32">
        <li
          v-for="(font, i) in CN_FONTS"
          :key="`font-${i}-${font.name}`"
          class="flex items-center px-3 h-8 text-sm cursor-pointer bg-transparent hover:bg-gray-100 rounded-t"
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
import { CN_FONTS } from "../../utils";
import { onStylesUpdate } from "../../utils";

const store = useStore();
const pickedFontName = computed(() => store.state.styles.fontCN.name);

const defaultFontId = CN_FONTS.findIndex(
  (item) => item.name === pickedFontName.value
);
const pickedFontId = ref(defaultFontId);

const pickFont = (i: number) => {
  pickedFontId.value = i;
  setStoreState("styles", "fontCN", CN_FONTS[pickedFontId.value]);
  onStylesUpdate(store.state.styles);
};
</script>
