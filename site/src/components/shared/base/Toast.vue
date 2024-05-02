<template>
  <div
    v-bind="api.rootProps"
    class="hstack space-x-5 min-w-80 text-white rounded-md shadow-c px-4 py-3"
    :class="bgColor"
  >
    <div flex-1 flex items-start space-x-2>
      <div size-6 flex-center>
        <span
          :class="[
            api.type === 'success' && 'i-ep:success-filled',
            api.type === 'info' && 'i-material-symbols:info-rounded text-lg',
            api.type === 'error' && 'i-bx:bxs-error'
          ]"
        />
      </div>
      <p v-bind="api.descriptionProps">{{ api.description }}</p>
    </div>

    <button size-6 flex-center @click="api.dismiss()">
      <span class="i-ep:close-bold duration-200 opacity-50 hover:opacity-100" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import * as toast from "@zag-js/toast";
import { normalizeProps, useActor } from "@zag-js/vue";

const props = defineProps<{ actor: toast.Service }>();

const [state, send] = useActor(props.actor);
const api = computed(() => toast.connect(state.value, send, normalizeProps));

const bgColor = computed(() => {
  switch (api.value.type) {
    case "success":
      return "bg-emerald-500";
    case "info":
      return "bg-blue-500";
    case "error":
      return "bg-red-500";
    default:
      return "bg-blue-500";
  }
});
</script>

<style scoped>
/* https://zagjs.com/components/vue-sfc/toast#requirement */

[data-part="root"] {
  translate: var(--x) var(--y);
  scale: var(--scale);
  z-index: var(--z-index);
  height: var(--height);
  opacity: var(--opacity);
  will-change: translate, opacity, scale;
}

[data-part="root"] {
  transition:
    translate 400ms,
    scale 400ms,
    opacity 400ms;
  transition-timing-function: cubic-bezier(0.21, 1.02, 0.73, 1);
}

[data-part="root"][data-state="closed"] {
  transition:
    translate 400ms,
    scale 400ms,
    opacity 200ms;
  transition-timing-function: cubic-bezier(0.06, 0.71, 0.55, 1);
}
</style>
