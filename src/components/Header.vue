<template>
  <header class="border-b flex items-center justify-between pl-5 pr-1 header">
    <div class="flex items-center space-x-6">
      <h1 class="font-bold text-lg">Oh, Resume!</h1>
    </div>
    <div class="space-x-3 flex items-center">
      <a
        class="flex items-center space-x-2 border rounded-md px-3 h-10 text-white bg-gray-500"
        href="http://github.com/Renovamen/oh-resume"
        target="_blank"
        rel="nofollow noopener"
      >
        <span
          class="iconify text-lg"
          data-icon="tabler:brand-github"
          data-inline="false"
        ></span>
        <span class="text-sm">GitHub</span>
      </a>
      <button
        class="flex items-center space-x-2 border rounded-md px-3 h-10 text-white bg-blue-500"
        @click="generatePDF"
      >
        <span
          class="iconify text-lg"
          data-icon="mdi:progress-download"
          data-inline="false"
        ></span>
        <span class="text-sm">PDF</span>
      </button>
    </div>
  </header>
</template>

<script lang="ts" setup>
const generatePDF = () => {
  window.print();
};
</script>
