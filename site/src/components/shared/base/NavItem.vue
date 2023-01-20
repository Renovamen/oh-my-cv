<template>
  <OnClickOutside
    relative
    @click="isDropDownOpen = !isDropDownOpen"
    @trigger="isDropDownOpen = false"
  >
    <div
      class="relative float-right hstack cursor-pointer space-x-1"
      role="button"
      tabindex="0"
    >
      <span v-if="icon" class="iconify md:text-lg" :data-icon="icon" />
      <span v-if="text" class="truncate max-w-xs hide-on-mobile">
        {{ text }}
      </span>
    </div>

    <!-- Dropdown -->
    <div
      v-show="isDropDownOpen"
      class="absolute z-20 top-6.5 right-0"
      @click="(e: Event) => e.stopPropagation()"
    >
      <slot />
    </div>
  </OnClickOutside>
</template>

<script lang="ts" setup>
import { OnClickOutside } from "@vueuse/components";

defineProps<{
  text?: string;
  icon?: string;
}>();

const isDropDownOpen = ref(false);
</script>
