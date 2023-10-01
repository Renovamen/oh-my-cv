<template>
  <nuxt-link class="hstack cursor-pointer space-x-1" :to="switchPath(link, locale)">
    <client-only>
      <span v-if="icon" class="iconify md:text-lg" :data-icon="icon" />
    </client-only>
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

const { locale } = useI18n();
</script>
