<template>
  <OnClickOutside
    class="cursor-pointer pc:relative"
    :class="[!dropdownMobileRight && 'relative']"
    @click="isDropDownOpen = !isDropDownOpen"
    @trigger="isDropDownOpen = false"
    @mouseenter="isTipOpen = true"
    @mouseleave="isTipOpen = false"
  >
    <div
      class="btn relative"
      :class="[
        props.text ? 'space-x-1 px-2 whitespace-nowrap' : 'w-7 pc:w-8',
        !isDropDownOpen && props.styles,
        isDropDownOpen && props.activeStyles
      ]"
    >
      <slot name="icon" />
      <span v-if="props.text" text="xs pc:sm">{{ props.text }}</span>
    </div>

    <span
      v-if="props.tip && isTipOpen && !isDropDownOpen"
      class="absolute z-20 rounded truncate right-0 pc:(left-1/2 -translate-x-2/4 right-auto)"
      p="x-2 y-1"
      top="8 pc:10"
      text="xs pc:sm white dark:black"
      bg="black opacity-80 dark:(gray-300 opacity-90)"
    >
      {{ props.tip }}
    </span>

    <!-- Dropdown -->
    <div
      v-show="isDropDownOpen"
      class="absolute pc:top-10 z-10 shadow"
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
  tip: {
    type: String,
    required: false,
    default: undefined
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
const isTipOpen = ref(false);
</script>
