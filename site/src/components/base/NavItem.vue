<template>
  <OnClickOutside
    class="cursor-pointer relative"
    @click="isDropDownOpen = !isDropDownOpen"
    @trigger="isDropDownOpen = false"
  >
    <div class="nav-item float-right" :class="reverse && 'flex-row-reverse'">
      <span v-if="icon" class="iconify pc:text-lg" :data-icon="icon" />
      <span
        v-if="text"
        text-base
        :class="[hideTextOnMobile && 'hidden pc:block']"
        >{{ text }}</span
      >
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
  text?: string;
  icon?: string;
  reverse?: boolean;
  hideTextOnMobile?: boolean;
}>();

const isDropDownOpen = ref(false);
</script>
