<template>
  <nuxt-link class="hstack cursor-pointer space-x-1" :to="switchPath(link, $i18n.locale)">
    <span v-if="icon" :class="icon" md:text-lg />
    <span class="truncate max-w-xs hide-on-mobile">
      {{ label }}
    </span>
  </nuxt-link>
</template>

<script lang="ts" setup>
defineProps<{
  label: string;
  link: string;
  icon?: string;
}>();
</script>
