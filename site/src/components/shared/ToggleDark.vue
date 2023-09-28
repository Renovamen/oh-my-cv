<template>
  <button class="round-btn" :title="t('toggle_dark')" @click="toggleDark()">
    <div v-show="colorMode.preference === 'dark'" flex-center>
      <client-only>
        <span class="iconify md:text-lg" data-icon="ph:moon-bold" />
      </client-only>
    </div>
    <div v-show="colorMode.preference !== 'dark'" flex-center>
      <client-only>
        <span class="iconify md:text-lg" data-icon="ph:sun-bold" />
      </client-only>
    </div>
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const { t } = useI18n();

const toggleDark = () => {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
};
</script>
