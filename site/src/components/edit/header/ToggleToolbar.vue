<template>
  <button class="round-btn" @click="$emit('toggleToolbar')">
    <div v-show="isToolbarOpen" flex-center>
      <span
        class="iconify md:text-lg"
        data-icon="tabler:layout-sidebar-right-collapse"
      />
    </div>
    <div v-show="!isToolbarOpen" flex-center>
      <span
        class="iconify md:text-lg"
        data-icon="tabler:layout-sidebar-right-expand"
      />
    </div>
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
