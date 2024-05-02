<template>
  <div
    v-bind="api.rootProps"
    class="hstack space-x-5 min-w-80 text-white rounded-md shadow-c px-4 py-3"
    :class="bgColor"
  >
    <div flex-1 flex items-start space-x-2>
      <div size-6 flex-center>
        <span v-if="api.type === 'success'" i-ep:success-filled />
        <span v-else-if="api.type === 'info'" i-material-symbols:info-rounded text-lg />
        <span v-else-if="api.type === 'error'" i-bx:bxs-error />
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
  opacity: var(--opacity);
  will-change: translate, opacity;
}

/* Borrowed from https://github.com/Maronato/vue-toastification/blob/next/src/scss/animations/_bounce.scss */

[data-part="root"][data-state="open"] {
  animation-name: bounceInRight;
  animation-duration: 750ms;
  animation-fill-mode: both;
}

@keyframes bounceInRight {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(3000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(-25px, 0, 0);
  }
  75% {
    transform: translate3d(10px, 0, 0);
  }
  90% {
    transform: translate3d(-5px, 0, 0);
  }
  to {
    transform: none;
  }
}
</style>
