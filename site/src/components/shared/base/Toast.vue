<template>
  <div
    v-bind="api.rootProps"
    class="hstack space-x-5 min-w-80 text-white rounded-md shadow-c px-4 py-3"
    :class="[bgColor]"
  >
    <div flex-1 hstack space-x-2>
      <div size-6 flex-center>
        <client-only>
          <span
            v-if="api.type === 'success'"
            class="iconify"
            data-icon="ep:success-filled"
          />
          <span
            v-else-if="api.type === 'info'"
            class="iconify text-lg"
            data-icon="material-symbols:info-rounded"
          />
          <span
            v-else-if="api.type === 'error'"
            class="iconify"
            data-icon="bx:bxs-error"
          />
        </client-only>
      </div>
      <p v-bind="api.descriptionProps">{{ api.description }}</p>
    </div>

    <button size-6 flex-center @click="api.dismiss()">
      <client-only>
        <span
          class="iconify duration-200 opacity-50 hover:opacity-100"
          data-icon="ep:close-bold"
        />
      </client-only>
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
/* Borrowed from https://github.com/Maronato/vue-toastification/blob/next/src/scss/animations/_bounce.scss */

[data-part="root"][data-state="open"] {
  animation-name: bounceInRight;
  animation-duration: 750ms;
  animation-fill-mode: both;
}

[data-part="root"][data-state="closed"] {
  animation-name: bounceOutRight;
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

@keyframes bounceOutRight {
  40% {
    opacity: 1;
    transform: translate3d(-20px, 0, 0);
  }
  to {
    opacity: 0;
    transform: translate3d(1000px, 0, 0);
  }
}
</style>
