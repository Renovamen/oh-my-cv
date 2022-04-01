<template>
  <header class="header border-b flex justify-between pl-4 pr-1">
    <div class="flex items-center">
      <h1 class="font-bold text-md sm:text-lg">Oh, Resume!</h1>
    </div>

    <!-- Buttons -->

    <div class="space-x-1.5 flex items-center text-gray-600">
      <!-- Theme color button -->
      <OnClickOutside
        class="relative"
        @click="isColorPickerOpen = !isColorPickerOpen"
        @trigger="isColorPickerOpen = false"
      >
        <div
          class="flex items-center justify-center p-2 h-7 w-7 sm:h-8 sm:w-8 rounded border cursor-pointer"
          :class="[isColorPickerOpen ? 'border-gray-500' : 'border-gray-300']"
        >
          <span
            class="w-full h-full rounded-sm"
            :style="{ backgroundColor: currentThemeColor }"
          />
        </div>

        <!-- Dropdown -->
        <ul
          v-if="isColorPickerOpen"
          class="absolute flex space-x-2 px-3 py-3 top-8 sm:top-10 -right-40.5 sm:right-0 bg-white border border-gray-300 shadow rounded z-10"
          @click="(e) => e.stopPropagation()"
        >
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
      </OnClickOutside>

      <!-- Margin (top-bottom) button -->
      <OnClickOutside
        class="relative"
        @click="isMarginVSliderOpen = !isMarginVSliderOpen"
        @trigger="isMarginVSliderOpen = false"
      >
        <div
          class="flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded border cursor-pointer"
          :class="[isMarginVSliderOpen ? 'border-gray-500' : 'border-gray-300']"
        >
          <span
            class="iconify text-sm sm:text-base"
            data-icon="icon-park-outline:margin-one"
          />
        </div>

        <!-- Dropdown -->
        <div
          v-show="isMarginVSliderOpen"
          class="absolute w-7 sm:w-8 py-3 top-8 sm:top-10 right-1/2 -mr-3.5 sm:-mr-4 bg-white border border-gray-300 shadow rounded z-10"
          @click="(e) => e.stopPropagation()"
        >
          <Slider v-model="marginV" orientation="vertical" class="mx-auto" />
        </div>
      </OnClickOutside>

      <!-- Margin (left-right) button -->
      <OnClickOutside
        class="relative"
        @click="isMarginHSliderOpen = !isMarginHSliderOpen"
        @trigger="isMarginHSliderOpen = false"
      >
        <div
          class="flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded border cursor-pointer"
          :class="[isMarginHSliderOpen ? 'border-gray-500' : 'border-gray-300']"
        >
          <span
            class="iconify text-sm sm:text-base"
            data-icon="icon-park-outline:margin"
          />
        </div>

        <!-- Dropdown -->
        <div
          v-show="isMarginHSliderOpen"
          class="absolute w-7 sm:w-8 py-3 top-8 sm:top-10 right-1/2 -mr-3.5 sm:-mr-4 bg-white border border-gray-300 shadow rounded z-10"
          @click="(e) => e.stopPropagation()"
        >
          <Slider v-model="marginH" orientation="vertical" class="mx-auto" />
        </div>
      </OnClickOutside>

      <!-- File button -->
      <OnClickOutside
        class="relative cursor-pointer"
        @click="isFileMenuOpen = !isFileMenuOpen"
        @trigger="isFileMenuOpen = false"
      >
        <div
          class="flex items-center space-x-1 px-2 sm:px-3 h-7 sm:h-8 text-white rounded"
          :class="[isFileMenuOpen ? 'bg-blue-600' : 'bg-blue-500']"
        >
          <span
            class="iconify text-sm sm:text-base"
            data-icon="mdi:file-outline"
          />
          <span class="text-xs sm:text-sm">File</span>
        </div>

        <!-- Dropdown -->
        <ul
          v-if="isFileMenuOpen"
          class="absolute top-8 sm:top-10 right-0 w-32 bg-white border border-gray-300 shadow rounded z-10"
        >
          <li
            class="flex items-center space-x-0.5 sm:space-x-1.5 px-3 h-9 cursor-pointer bg-transparent hover:bg-gray-100 rounded-t"
            @click="toggleImport(true)"
          >
            <span class="iconify text-sm sm:text-base" data-icon="mdi:upload" />
            <span class="text-xs sm:text-sm">Import MD</span>
          </li>
          <li
            class="flex items-center space-x-0.5 sm:space-x-1.5 px-3 h-9 cursor-pointer bg-transparent hover:bg-gray-100 rounded-b"
            @click="generatePDF"
          >
            <span
              class="iconify text-sm sm:text-base"
              data-icon="mdi:progress-download"
            />
            <span class="text-xs sm:text-sm">Export PDF</span>
          </li>
        </ul>
      </OnClickOutside>

      <!-- Github -->
      <a
        class="flex items-center justify-center space-x-1 h-7 w-7 sm:h-8 sm:w-8 text-white rounded bg-gray-500 hover:bg-gray-600"
        href="http://github.com/Renovamen/oh-resume"
        target="_blank"
        rel="nofollow noopener"
      >
        <span
          class="iconify text-sm sm:text-lg"
          data-icon="tabler:brand-github"
        />
      </a>
    </div>

    <Import
      v-if="isImportOpen"
      @close-import="toggleImport(false)"
      @update-markdown-content="
        (c) => {
          $emit('updateMarkdownContent', c);
          isImportOpen = false;
        }
      "
    />
  </header>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { OnClickOutside } from "@vueuse/components";
import Slider from "@vueform/slider";
import "@vueform/slider/themes/default.css";
import Import from "./Import.vue";
import { setStyleState } from "../store";
import { onStylesUpdate, DEFAULT_THEME_COLORS } from "../utils";

defineEmits<{
  (e: "updateMarkdownContent", content: string): void;
}>();

const generatePDF = () => {
  window.print();
};

// Import menu
const isImportOpen = ref(false);

const toggleImport = (to?: boolean): void => {
  isImportOpen.value = typeof to === "boolean" ? to : !isImportOpen.value;
};

// File menu
const isFileMenuOpen = ref(false);

// Styles
const store = useStore();

// Margin slider
const isMarginVSliderOpen = ref(false);
const isMarginHSliderOpen = ref(false);

const marginV = computed({
  get() {
    return store.state.marginV;
  },
  set(value: number) {
    setStyleState("marginV", value);
    onStylesUpdate(store.state);
  }
});

const marginH = computed({
  get() {
    return store.state.marginH;
  },
  set(value: number) {
    setStyleState("marginH", value);
    onStylesUpdate(store.state);
  }
});

// Theme color picker
const isColorPickerOpen = ref(false);
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
    setStyleState("themeColor", currentThemeColor.value);
    onStylesUpdate(store.state);
  }
);
</script>
