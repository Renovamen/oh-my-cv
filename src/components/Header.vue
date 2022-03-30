<template>
  <header class="header border-b flex justify-between pl-4 pr-1">
    <div class="flex items-center">
      <h1 class="font-bold text-md sm:text-lg">Oh, Resume!</h1>
    </div>
    <div class="space-x-1 flex items-center">
      <a
        class="flex items-center space-x-0.5 sm:space-x-1.5 border rounded-md px-2 sm:px-3 h-9 sm:h-10 text-white bg-gray-500 hover:bg-gray-600"
        href="http://github.com/Renovamen/oh-resume"
        target="_blank"
        rel="nofollow noopener"
      >
        <span
          class="iconify text-sm sm:text-lg"
          data-icon="tabler:brand-github"
        />
        <span class="text-xs sm:text-sm">GitHub</span>
      </a>
      <button
        class="flex items-center space-x-0.5 sm:space-x-1.5 border rounded-md px-2 sm:px-3 h-9 sm:h-10 text-white bg-green-500 hover:bg-green-600"
        @click="toggleImport(true)"
      >
        <span class="iconify text-sm sm:text-lg" data-icon="mdi:upload" />
        <span class="text-xs sm:text-sm">Import</span>
      </button>
      <button
        class="flex items-center space-x-0.5 sm:space-x-1.5 border rounded-md px-2 sm:px-3 h-9 sm:h-10 text-white bg-blue-500 hover:bg-blue-600"
        @click="generatePDF"
      >
        <span
          class="iconify text-sm sm:text-lg"
          data-icon="mdi:progress-download"
        />
        <span class="text-xs sm:text-sm">PDF</span>
      </button>
    </div>
  </header>

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
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Import from "./Import.vue";

defineEmits<{
  (e: "updateMarkdownContent", content: string): void;
}>();

const generatePDF = () => {
  window.print();
};

const isImportOpen = ref(false);

const toggleImport = (to?: boolean): void => {
  isImportOpen.value = typeof to === "boolean" ? to : !isImportOpen.value;
};
</script>
