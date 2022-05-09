<template>
  <div class="btn w-7 pc:w-8 text-white bg-indigo-500" @click="toggleDark()">
    <div v-show="!isDark" class="w-full h-full flex-center">
      <span class="iconify" text="sm pc:base" data-icon="ph:sun-bold" />
    </div>
    <div v-show="isDark" class="w-full h-full flex-center">
      <span class="iconify" text="sm pc:base" data-icon="ph:moon-bold" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isDark, toggleDark } from "~/composables";
</script>
