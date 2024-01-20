<template>
  <button class="round-btn" @click="$emit('toggleToolbar')">
    <span v-show="isToolbarOpen" i-tabler:layout-sidebar-right-collapse md:text-lg />
    <span v-show="!isToolbarOpen" i-tabler:layout-sidebar-right-expand md:text-lg />
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  isToolbarOpen: boolean;
}>();

defineEmits<{
  (e: "toggleToolbar"): void;
}>();
</script>
