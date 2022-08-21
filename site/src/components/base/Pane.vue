<template>
  <OnClickOutside
    class="!m-auto z-30 fixed bg-c flex flex-col left-0 right-0 top-0 bottom-0 shadow overflow-hidden"
    border="1 gray-400 dark:gray-500 rounded"
    @trigger="$emit('close')"
  >
    <div hstack justify-between p="x-4 t-3 b-1">
      <div hstack font-medium>
        <span class="iconify" :data-icon="icon" />
        <span mx-2 text="sm light-c">/</span>
        <span text-sm>{{ text }}</span>
      </div>
      <button hstack @click="$emit('close')">
        <span class="iconify" data-icon="ic:baseline-close" />
      </button>
    </div>

    <slot />
  </OnClickOutside>
</template>

<script lang="ts" setup>
import { OnClickOutside } from "@vueuse/components";

defineProps<{
  text: string;
  icon: string;
}>();

defineEmits<{
  (e: "close"): void;
}>();
</script>
