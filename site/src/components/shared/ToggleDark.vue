<template>
  <button
    class="round-btn"
    :title="$t('toggle_dark')"
    @click="$colorMode.preference = $colorMode.preference === 'dark' ? 'light' : 'dark'"
  >
    <span
      :class="$colorMode.preference === 'dark' ? 'i-ph:moon-bold' : 'i-ph:sun-bold'"
      md:text-lg
    />
  </button>
</template>
