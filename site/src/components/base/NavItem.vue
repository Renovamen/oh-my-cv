<template>
  <OnClickOutside
    class="cursor-pointer relative"
    @click="isDropDownOpen = !isDropDownOpen"
    @trigger="isDropDownOpen = false"
  >
    <div class="nav-item">
      <span v-if="icon" class="iconify pc:text-lg" :data-icon="icon" />
      <span text="sm pc:base">{{ text }}</span>
    </div>

    <!-- Dropdown -->
    <div
      v-show="isDropDownOpen"
      class="absolute z-20 shadow border border-c rounded top-6.5 right-0"
      bg="white dark:dark-400"
      @click="(e: Event) => e.stopPropagation()"
    >
      <slot />
    </div>
  </OnClickOutside>
</template>

<script lang="ts" setup>
import { OnClickOutside } from "@vueuse/components";

defineProps<{
  text: string;
  icon?: string;
}>();

const isDropDownOpen = ref(false);
</script>
