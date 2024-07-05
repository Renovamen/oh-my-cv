<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/shadcn";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <h5 :class="cn('mb-1 font-bold leading-none tracking-tight', props.class)">
    <slot />
  </h5>
</template>
