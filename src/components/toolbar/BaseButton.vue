<template>
  <OnClickOutside
    class="relative cursor-pointer"
    @click="isDropDownOpen = !isDropDownOpen"
    @trigger="isDropDownOpen = false"
  >
    <div
      class="flex items-center justify-center h-7 sm:h-8 rounded cursor-pointer"
      :class="[
        props.text ? 'space-x-1 px-2 sm:px-3' : 'w-7 sm:w-8',
        !isDropDownOpen && props.styles,
        isDropDownOpen && props.activeStyles
      ]"
    >
      <slot name="icon" />
      <span v-if="props.text" class="text-xs sm:text-sm">{{ props.text }}</span>
    </div>

    <!-- Dropdown -->
    <div
      v-show="isDropDownOpen"
      class="absolute top-8 sm:top-10 z-10 right-0 bg-white border border-gray-300 shadow rounded"
      @click="(e) => e.stopPropagation()"
    >
      <slot name="dropdown" />
    </div>
  </OnClickOutside>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { OnClickOutside } from "@vueuse/components";

const props = defineProps({
  text: {
    type: String,
    required: false,
    default: ""
  },
  styles: {
    type: String,
    required: false,
    default: "border border-gray-300"
  },
  activeStyles: {
    type: String,
    required: false,
    default: "border border-gray-500"
  }
});

const isDropDownOpen = ref(false);
</script>
