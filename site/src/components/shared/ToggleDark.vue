<template>
  <button class="round-btn" :title="t('toggle_dark')" @click="toggleDark()">
    <div v-show="isDark" flex-center>
      <span class="iconify md:text-lg" data-icon="ph:moon-bold" />
    </div>
    <div v-show="!isDark" flex-center>
      <span class="iconify md:text-lg" data-icon="ph:sun-bold" />
    </div>
  </button>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>
