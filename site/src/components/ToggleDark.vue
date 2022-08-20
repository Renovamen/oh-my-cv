<template>
  <button cursor-pointer :title="t('nav.toggle_dark')" @click="toggleDark()">
    <div v-show="isDark" class="w-full h-full flex-center">
      <span class="iconify pc:text-lg" data-icon="ph:moon-bold" />
    </div>
    <div v-show="!isDark" class="w-full h-full flex-center">
      <span class="iconify pc:text-lg" data-icon="ph:sun-bold" />
    </div>
  </button>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>
