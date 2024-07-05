<template>
  <SliderRoot
    class="relative flex w-full touch-none select-none items-center py-2"
    v-bind="forwarded"
  >
    <SliderTrack
      class="relative h-1 w-full grow overflow-hidden rounded-full bg-secondary"
    >
      <SliderRange class="absolute h-full bg-primary" />
    </SliderTrack>
    <SliderThumb
      v-for="(_, key) in modelValue"
      :key="key"
      class="group block size-4 rounded-full border-2.5 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    >
      <span
        class="hidden group-hover:block group-focus-visible:block p-1 min-w-6 rounded bg-primary absolute -top-2 left-1/2 -translate-x-2/4 -translate-y-full after:(absolute content-[''] size-0 border-5 border-transparent border-t-primary top-full inset-x-0 mx-auto)"
        text="white xs center"
      >
        {{ modelValue?.at(0) }}
      </span>
    </SliderThumb>
  </SliderRoot>

  <div flex justify-between text-muted-foreground>
    <span>{{ min }}{{ unit }}</span>
    <span>{{ middle }}{{ unit }}</span>
    <span>{{ max }}{{ unit }}</span>
  </div>
</template>

<script lang="ts" setup>
import type { SliderRootEmits, SliderRootProps } from "radix-vue";
import { useForwardPropsEmits } from "radix-vue";

const props = defineProps<
  SliderRootProps & {
    unit?: string;
  }
>();
const emits = defineEmits<SliderRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);

const min = computed(() => props.min || 0);
const max = computed(() => props.max || 100);
const middle = computed(() => (min.value + max.value) / 2);

const unit = computed(() => props.unit || "");
</script>
