<template>
  <header
    class="header relative border-b dark:(bg-dark-400 border-gray-600) flex justify-between pl-4 pr-1.5"
  >
    <div class="flex items-center">
      <h1 class="font-bold text-base sm:text-lg dark:text-gray-100">
        Oh, Resume!
      </h1>
    </div>

    <div class="space-x-1.5 flex items-center text-gray-600 dark:text-gray-300">
      <Toolbar />
      <ToggleDark />
      <File />
      <a
        class="flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 text-white rounded bg-gray-500 hover:bg-gray-600"
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
  </header>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import Toolbar from "./Toolbar.vue";
import ToggleDark from "./ToggleDark.vue";
import File from "./file/File.vue";
</script>
