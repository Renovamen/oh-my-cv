<template>
  <button
    class="round-btn"
    :title="$t('toggle_dark')"
    @click="$colorMode.preference = $colorMode.preference === 'dark' ? 'light' : 'dark'"
  >
    <div v-show="$colorMode.preference === 'dark'" flex-center>
      <client-only>
        <span class="iconify md:text-lg" data-icon="ph:moon-bold" />
      </client-only>
    </div>
    <div v-show="$colorMode.preference !== 'dark'" flex-center>
      <client-only>
        <span class="iconify md:text-lg" data-icon="ph:sun-bold" />
      </client-only>
    </div>
  </button>
</template>
