<template>
  <div
    v-for="(toasts, placement, index) in $toast.toastsByPlacement"
    :key="index"
    class="toast-container"
  >
    <div :key="placement" v-bind="$toast.getGroupProps({ placement })">
      <Toast v-for="toast in toasts" :key="toast.id" :actor="toast" />
    </div>
  </div>
</template>

<script setup lang="ts">
import * as toast from "@zag-js/toast";
import { normalizeProps, useMachine } from "@zag-js/vue";

const nuxtApp = useNuxtApp();

const [state, send] = useMachine(
  toast.group.machine({
    id: "toast",
    placement: "bottom-end",
    duration: 2500,
    removeDelay: 750
  })
);
const toastApi = computed(() => toast.group.connect(state.value, send, normalizeProps));

nuxtApp.provide("toast", toastApi);

const $toast = computed(() => (nuxtApp.$toast as ComputedRef<toast.GroupApi>).value);
</script>
