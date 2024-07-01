<template>
  <UiButton
    variant="ghost-secondary"
    size="round"
    :aria-label="$t('toggle_dark')"
    @click="$colorMode.preference = $colorMode.preference === 'dark' ? 'light' : 'dark'"
  >
    <div
      class="i-ph:sun-bold size-4 scale-100 rotate-0 dark:(scale-0 -rotate-90) transition-transform duration-500"
    />
    <div
      class="i-ph:moon-bold size-4 absolute scale-0 rotate-90 dark:(scale-100 rotate-0) transition-transform duration-500"
    />
  </UiButton>
</template>
