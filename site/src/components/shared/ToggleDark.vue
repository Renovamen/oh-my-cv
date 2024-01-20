<template>
  <button
    class="round-btn"
    :title="$t('toggle_dark')"
    @click="$colorMode.preference = $colorMode.preference === 'dark' ? 'light' : 'dark'"
  >
    <span v-show="$colorMode.preference === 'dark'" i-ph:moon-bold md:text-lg />
    <span v-show="$colorMode.preference !== 'dark'" i-ph:sun-bold md:text-lg />
  </button>
</template>
