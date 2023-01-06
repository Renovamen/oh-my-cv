<template>
  <OnClickOutside
    relative
    @click="isDropDownOpen = !isDropDownOpen"
    @trigger="isDropDownOpen = false"
  >
    <div
      class="nav-item float-right"
      :class="reverse && 'flex-row-reverse'"
      role="button"
      tabindex="0"
    >
      <span v-if="icon" class="iconify md:text-lg" :data-icon="icon" />
      <span
        v-if="text"
        class="truncate max-w-[7rem] sm:max-w-xs"
        :class="[hideTextOnMobile && 'hidden md:block']"
        text="sm md:base"
      >
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
  reverse?: boolean;
  hideTextOnMobile?: boolean;
}>();

const isDropDownOpen = ref(false);
</script>
