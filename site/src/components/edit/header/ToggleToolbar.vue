<template>
  <button class="round-btn" @click="$emit('toggleToolbar')">
    <div v-show="isToolbarOpen" flex-center>
      <client-only>
        <span
          class="iconify md:text-lg"
          data-icon="tabler:layout-sidebar-right-collapse"
        />
      </client-only>
    </div>
    <div v-show="!isToolbarOpen" flex-center>
      <client-only>
        <span class="iconify md:text-lg" data-icon="tabler:layout-sidebar-right-expand" />
      </client-only>
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
