<template>
  <div class="tool-item mx-4 mt-5 pb-6" text="xs md:sm">
    <div hstack space-x-2 mb-4 text="sm md:base">
      <span v-if="icon" class="iconify" :data-icon="icon" />
      <span>{{ text }}</span>
    </div>

    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  text: string;
  icon?: string;
}>();
</script>
