<template>
  <header
    class="header relative flex justify-between dark:bg-dark-400 pl-4 pr-1.5"
    border="b gray-300 dark:gray-600"
  >
    <div class="flex items-center">
      <h1 font="bold" text="base sm:lg dark:gray-100">Oh, Resume!</h1>
    </div>

    <div class="space-x-1.5 flex items-center text-gray-600 dark:text-gray-300">
      <Toolbar />
      <ToggleDark />
      <File />
      <a
        class="btn w-7 sm:w-8 text-white bg-gray-500 hover:bg-gray-600"
        href="http://github.com/Renovamen/oh-resume"
        target="_blank"
        rel="nofollow noopener"
      >
        <span class="iconify" text="sm sm:lg" data-icon="tabler:brand-github" />
      </a>
    </div>
  </header>
</template>

<script lang="ts" setup>
import Toolbar from "./Toolbar.vue";
import ToggleDark from "./ToggleDark.vue";
import File from "./file/File.vue";
</script>
