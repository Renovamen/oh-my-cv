<template>
  <div v-bind="api.rootProps">
    <div v-bind="api.controlProps" py-2>
      <div
        v-bind="api.trackProps"
        class="h-1 bg-slate-400/50 rounded-full overflow-hidden"
      >
        <div v-bind="api.rangeProps" class="h-1 bg-brand" />
      </div>

      <div
        v-bind="api.getThumbProps({ index: 0 })"
        class="size-4 rounded-full -mt-2.5"
        bg="white dark:slate-300"
        shadow="c slate-500"
      >
        <span
          class="p-1 min-w-6 rounded bg-brand absolute -top-2 left-1/2 -translate-x-2/4 -translate-y-full"
          :class="api.isDragging ? 'opacity-100' : 'opacity-0'"
          text="white xs center"
        >
          {{ api.value.at(0) }}
        </span>
      </div>
    </div>

    <div flex justify-between>
      <span>{{ min }}{{ unit }}</span>
      <span>{{ middle }}{{ unit }}</span>
      <span>{{ max }}{{ unit }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as slider from "@zag-js/slider";
import { normalizeProps, useMachine } from "@zag-js/vue";

const props = defineProps<{
  id: string;
  default: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  onValueChange: (value: number) => void;
}>();

const [state, send] = useMachine(
  slider.machine({
    id: props.id,
    thumbAlignment: "center",
    value: [props.default],
    min: props.min,
    max: props.max,
    step: props.step,
    onValueChange: (details) => props.onValueChange(details.value[0])
  })
);
const api = computed(() => slider.connect(state.value, send, normalizeProps));

watch(
  () => props.default,
  () => api.value.setValue([props.default])
);

const min = computed(() => props.min || 0);
const max = computed(() => props.max || 100);
const middle = computed(() => (min.value + max.value) / 2);

const unit = computed(() => props.unit || "");
</script>

<style scoped>
[data-part="thumb"]:hover span {
  @apply opacity-100;
}

[data-part="thumb"] span::after {
  @apply absolute content-[""] size-0 border-5 border-transparent border-t-red-400 dark:border-t-rose-400 top-full left-0 right-0 mx-auto;
}
</style>
