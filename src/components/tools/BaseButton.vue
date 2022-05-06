<template>
  <OnClickOutside
    class="cursor-pointer sm:relative"
    :class="[!dropdownMobileRight && 'relative']"
    @click="isDropDownOpen = !isDropDownOpen"
    @trigger="isDropDownOpen = false"
  >
    <div
      class="btn"
      :class="[
        props.text ? 'space-x-1 px-2 sm:px-3 whitespace-nowrap' : 'w-7 sm:w-8',
        !isDropDownOpen && props.styles,
        isDropDownOpen && props.activeStyles
      ]"
    >
      <slot name="icon" />
      <span v-if="props.text" text="xs sm:sm">{{ props.text }}</span>
    </div>

    <!-- Dropdown -->
    <div
      v-show="isDropDownOpen"
      class="absolute sm:top-10 z-10 shadow"
      bg="white dark:dark-400"
      border="1 rounded gray-300 dark:gray-600"
      :class="[dropdownMobileRight ? 'top-11 right-1.5' : 'top-8 right-0']"
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
    default: "border border-gray-300 dark:border-gray-600"
  },
  activeStyles: {
    type: String,
    required: false,
    default: "border border-gray-500 dark:border-gray-400"
  },
  dropdownMobileRight: {
    type: Boolean,
    required: false,
    default: false
  }
});

const isDropDownOpen = ref(false);
</script>
